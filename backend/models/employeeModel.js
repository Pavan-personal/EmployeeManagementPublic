const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  designation: String,
  gender: String,
  profileImage: String,
  course: String,
  createdDate: Date,
  belongsTo: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
  },
});

const Employee = mongoose.model("Employee", employeeModel);

module.exports = {
  Employee,
};
