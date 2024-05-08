const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (data) {
        req.userId = data.user;
        next();
      } else {
        res.send({ success: false, message: "Account is not verified!" });
        return;
      }
    });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  verifyUser,
};
