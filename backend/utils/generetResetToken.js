const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { db } = require("../config/dbConnection");
const moment = require("moment");

const generateToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetTokenExpiration = moment()
    .add(10, "minutes")
    .format("YYYY-MM-DD HH:mm:ss");

  return {
    passwordResetToken,
    passwordResetTokenExpiration,
  };
};

module.exports = { generateToken };
