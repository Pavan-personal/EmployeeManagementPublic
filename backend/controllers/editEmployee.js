const { Employee } = require("../models/employeeModel");

const editEmployee = async (req, res) => {
  try {
    const current = await Employee.findById(req.params.id);
    const { name, email, mobile, gender, designation, course } = req.body;
    const d1 = await Employee.findOne({ email: email });
    const d2 = await Employee.findOne({ mobile: mobile });
    if (
      (d1 && d1.email !== current.email) ||
      (d2 && d2.mobile !== current.mobile)
    ) {
      res.send({ success: false, message: "Email/PhnNo already taken!" });
      return;
    }
    const check = await Employee.findByIdAndUpdate(req.params.id, {
      name: name,
      email: email,
      mobile: mobile,
      gender: gender,
      designation: designation,
      course: course,
      profileImage: req.attachment,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};
module.exports = {
  editEmployee,
};
