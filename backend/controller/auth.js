const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { db } = require("../config/dbConnection");
const moment = require("moment");
const { sendEmail } = require("../utils/email");
const { generateToken } = require("../utils/generetResetToken");

//code for register User
const registerUser = async (req, res) => {
  try {
    const { email, password, name, mobile, role } = req.body;
    const [resultSets, fields] = await db.query("CALL findUserByEmail(?)", [
      email,
    ]);

    const users = resultSets[0];

    if (users.length > 0) return res.status(409).json("User Already Exists");
    else {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const [resultSets, fields] = await db.query(
        "CALL registerUser(?,?,?,?,?)",
        [email, hashPass, name, mobile, role]
      );

      return res
        .status(200)
        .json({ message: "User Registerd Succesfully!!" + resultSets[0] });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//code for login user
const loginUser = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const [resultSets, fields] = await db.query("CALL findUserByEmail(?)", [
      email,
    ]);

    if (resultSets[0].length === 0)
      return res.status(404).json("User Not Found!!");
    else {
      const checkPass = bcrypt.compareSync(pass, resultSets[0][0]?.password);

      if (!checkPass) return res.status(400).json("Wrong Email or Password");
      console.log(resultSets[0][0]);

      const token = jwt.sign(
        { id: resultSets[0][0].user_id },
        process.env.JWT_SECRET
      );

      const { password, ...others } = resultSets[0][0];

      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ others, token });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send(error.message);
  }
};

//forget password User
const forgotPass = async (req, res, next) => {
  const { email } = req.body;
  // console.log(email);

  try {
    const [resultSets, fields] = await db.query("CALL findUserByEmail(?)", [
      email,
    ]);

    if (resultSets[0].length === 0)
      return res.status(404).json("User Not Found!!");

    const { passwordResetToken, passwordResetTokenExpiration } =
      generateToken();

    try {
      const insertQry =
        "INSERT INTO password_reset (pass_resetToken, pass_resetTokenExpire, user_id) VALUES (?, ?, ?)";
      const result = await db.query(insertQry, [
        passwordResetToken,
        passwordResetTokenExpiration,
        resultSets[0][0].user_id,
      ]);
      // return res.json(result[0])
      const resetUrl = `http://localhost:4200/reset/${passwordResetToken}`;
      const message = "Reset mail below";
      const html = `
        <p>We have received a password reset request. Please use the link below to reset your password:</p>
        <p><strong>Token:</strong></p>
        <p><a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Click here to reset your password</a></p>
        <p>This link is valid for 10 minutes only.</p>`;
      console.log(resetUrl, message);

      try {
        sendEmail({
          email: email,
          subject: "Password Change Request",
          message: message,
          html: html,
        });

        return res.status(200).json({ message: "Email Sent Successfully!!" });
      } catch (error) {
        return res.status(500).json(error.message);
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send(error.message);
  }
};

//reset password
const resetPass = async (req, res, next) => {
  const { passwordResetToken } = req.params;
  const { newPassword } = req.body;
  let user_id, del_id;

  // return res.status(200).json({ token, passwordResetToken });

  try {
    const qry = `
   select p.* , u.email 
    from password_reset p
    join users u
    on p.user_id = u.user_id
    where pass_resetToken = ? 
    and pass_resetTokenExpire > now()
  `;
    const result = await db.query(qry, [passwordResetToken]);
    // return res.json(result[0][0]?.user_id);
    if (result[0].length === 0)
      return res.status(409).json({ message: "invalid token!!" });
    // return res.json(result[0][0])
    user_id = result[0][0]?.user_id;
    del_id = result[0][0]?.pass_reset_id;
    try {
      const qry = `update users set password = ? where user_id = ?`;
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(newPassword, salt);
      const data = await db.query(qry, [hashPass, user_id]);

      try {
        const qry = `delete from password_reset where pass_reset_id = ?`;
        const data = await db.query(qry, [del_id]);
        return res
          .status(200)
          .json({ message: "password reset successfully!!" });
      } catch (error) {
        throw new Error(error);
      }

      return res.json({ message: "password updated succesfully!!" });
    } catch (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(error);
  }
};

//update profile
const updateUserProfile = async (req, res) => {
  try {
    const { email, name, mobile, user_id } = req.body;

    const [resultSets, fields] = await db.query("CALL updateProfile(?,?,?,?)", [
      email,
      name,
      mobile,
      user_id,
    ]);

    // const users = resultSets[0];
    res.status(200).json({ message: "user Updated Succesfully" });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateProfilePic = async (req, res) => {
  try {
    const { profile_pic, user_id } = req.body;

    const [resultSets, fields] = await db.query("CALL updateProfilePic(?,?)", [
      profile_pic,
      user_id,
    ]);

    res.status(200).json({ message: "Profile Updated Succesfully" });
  } catch (error) {
    throw new Error(error);
  }
};

//checkPas
const chekPassword = async (req, res) => {
  const { user_id, password } = req.params;
  console.log(user_id, password);
  try {
    const [resultSets, fields] = await db.query("CALL checkPass(?)", [user_id]);
    const checkPass = bcrypt.compareSync(password, resultSets[0][0]?.password);
    if (!checkPass)
      return res.status(400).json({ message: "Password not Matched" });
    res.status(200).json(resultSets[0][0]?.password);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//update Password
const updatePassword = async (req, res) => {
  try {
    const { user_id, new_password } = req.body;
    // console.log(user_id);

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(new_password, salt);
    const [resultSets, fields] = await db.query("CALL updatePass(?,?)", [
      user_id,
      hashPass,
    ]);

    res.status(200).json({ message: "user Pass Updated SuccesFully!!" });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

//code for logOut user
const logOut = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("Logged Out Successfully");
};

module.exports = {
  registerUser,
  updateUserProfile,
  loginUser,
  logOut,
  forgotPass,
  resetPass,
  chekPassword,
  updatePassword,
  updateProfilePic,
};
