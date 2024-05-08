const { Admin } = require("../models/adminModel");
const { Employee } = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  try {
    const { name, email, mobile, gender, designation, course } = req.body;
    const d1 = await Employee.findOne({ email: email });
    const d2 = await Employee.findOne({ mobile: mobile });
    if (d1 || d2) {
      res.send({ success: false, message: "Email/PhnNo already taken!" });
      return;
    }
    await Employee.create({
      name: name,
      email: email,
      mobile: mobile,
      gender: gender,
      designation: designation,
      course: course,
      createdDate: Date.now(),
      profileImage: req.attachment,
      belongsTo: req.userId,
    })
      .then(async (emp) => {
        await Admin.findByIdAndUpdate(req.userId, {
          $push: {
            employeeList: emp._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ success: false, message: "Something went wrong!" });
        return;
      });
    res.send({ success: true, message: "Added employee successfully!" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};
module.exports = {
  addEmployee,
};
