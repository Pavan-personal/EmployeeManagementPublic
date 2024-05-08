const { Admin } = require("../models/adminModel");
const { createToken } = require("../utils/createToken");

const signinUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    await Admin.findOne({ username: username }).then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ success: false, message: "Username doesn't exist!" });
        return;
      } else {
        if (user.password !== password) {
          res
            .status(404)
            .send({ success: false, message: "Incorrect password!" });
          return;
        } else {
          const token = createToken(user._id);
          res.send({
            success: true,
            message: "signin successfull!",
            token: token,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  signinUser,
};
