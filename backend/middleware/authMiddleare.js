const jwt = require("jsonwebtoken");
const { db } = require("../config/dbConnection");

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedUser);
        req.userId = decodedUser.id;
        const userResult = await db.query(
          "select * from users where user_id = ?",
          [decodedUser?.id]
        );
        req.user = userResult[0][0];
        next();
      }
    } catch (error) {
      throw new Error("Not Authorize Token, Please Login");
    }
  } else {
    throw new Error("There is no Token Attach TO Headers");
  }
};

const isAdmin = async (req, res, next) => {
  // if (req.user?.role !== "seller") {
  //   throw new Error("You are not Admin");
  // } else {
  //   next();
  // }
};

module.exports = { authMiddleware, isAdmin };
