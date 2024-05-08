const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "../.env",
});

const createToken = (user) => {
  try {
    return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "7h" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createToken,
};
