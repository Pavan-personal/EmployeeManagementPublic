const { Admin } = require("../models/adminModel");
const { createToken } = require("../utils/createToken");

const signupUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const d1 = await Admin.findOne({ email: email });
    const d2 = await Admin.findOne({ username: username });

    if (d1 || d2) {
      res.send({ success: false, message: "email/username already taken!" });
      return;
    }

    const user = await Admin.create({
      username: username,
      password: password,
      email: email,
    }).catch((err) => {
      console.log(err);
      res
        .status(404)
        .send({ success: false, message: "Something went wrong!" });
    });
    if (user) {
      const token = createToken(user);
      res.send({
        success: true,
        message: "Account created successfully!",
        token: token,
      });
    } else {
      res
        .status(404)
        .send({ success: false, message: "Something went wrong!" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};

module.exports = {
  signupUser,
};
