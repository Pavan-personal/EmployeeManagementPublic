const mongoose = require("mongoose");

const adminModel = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  employeeList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Admin = mongoose.model("Admin", adminModel);

module.exports = {
  Admin,
};
