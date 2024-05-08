const { Admin } = require("../models/adminModel");
const { Employee } = require("../models/employeeModel");

const removeEmployee = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.userId, {
      $pull: {
        employeeList: req.params.id,
      },
    })
      .then(async (success) => {
        await Employee.findByIdAndDelete(req.params.id);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(404)
          .send({ success: false, message: "Something went wrong!" });
      });
    res.send({ success: true, message: "Removed employee successfully!" });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};
module.exports = {
  removeEmployee,
};
