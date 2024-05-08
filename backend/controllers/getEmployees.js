const { Employee } = require("../models/employeeModel");

const getEmployees = async (req, res) => {
  try {
    const employeeList = await Employee.find({ belongsTo: req.userId }).catch(
      (error) => {
        console.log(error);
        res
          .status(404)
          .send({ success: false, message: "Something went wrong!" });
      }
    );
    res.send({ success: true, data: employeeList });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, message: "Something went wrong!" });
  }
};
module.exports = {
  getEmployees,
};
