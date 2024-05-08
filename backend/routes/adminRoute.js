const { addEmployee } = require("../controllers/addEmployee");
const { editEmployee } = require("../controllers/editEmployee");
const { getEmployees } = require("../controllers/getEmployees");
const { removeEmployee } = require("../controllers/removeEmployee");
const { signinUser } = require("../controllers/signinUser");
const { signupUser } = require("../controllers/signupUser");
const { fileToUrl } = require("../middlewares/fileToUrl");
const { verifyUser } = require("../middlewares/verifyUser");

const adminRouter = require("express").Router();

adminRouter.post("/signup", signupUser);
adminRouter.post("/signin", signinUser);
adminRouter.get("/view", verifyUser, getEmployees);
adminRouter.post("/add", verifyUser, fileToUrl, addEmployee);
adminRouter.put("/edit/:id", verifyUser, fileToUrl, editEmployee);
adminRouter.delete("/remove/:id", verifyUser, removeEmployee);

module.exports = {
  adminRouter,
};
