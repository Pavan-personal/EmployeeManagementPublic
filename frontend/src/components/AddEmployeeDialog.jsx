import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Link } from "react-router-dom";
import { useState } from "react";
import { loadingAtom } from "../recoil/loadingAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { effectLoadAtom } from "../recoil/effectLoadAtom";

export default function AddEmployeeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [effect, setEffect] = useRecoilState(effectLoadAtom);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    course: "",
    gender: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  return (
    <React.Fragment>
      <li>
        <button
          onClick={handleClickOpen}
          to={"/add"}
          class="block rounded-[0.25rem] text-[1rem] px-2 pb-0.5 duration-500 text-slate-200 select-none hover:text-white cursor-pointer bg-blue-600"
        >
          add +
        </button>
      </li>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogContent className="border-2 border-slate-600 bg-slate-800">
          <div className="flex justify-center items-center flex-col bg-slate-800 box-border">
            <form className="min-w-[26rem] scale-95 bg-slate-00 rounded-lg flex flex-col gap-3 box-border">
              <div className="font-bold text-2xl opacity-85 text-slate-400 text-center pb-1">
                Add Employee
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                  >
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter employee name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="mobile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="12345-67890"
                    minLength={10}
                    maxLength={10}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                >
                  Gender
                </label>
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-slate-400">
                  <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center justify-center ps-3">
                      <input
                        id="female"
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="female"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </li>
                  <li className="w-full dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="male"
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="male"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="designation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                >
                  Designation
                </label>
                <select
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select your designation</option>
                  <option>Manager</option>
                  <option>HR</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="course"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select course</option>
                  <option>BSC</option>
                  <option>BCA</option>
                  <option>MCA</option>
                </select>
              </div>
              <div class="mb-3">
                <label
                  for="formFileLg"
                  class="mb-2 text-sm font-semibold inline-block text-gray-900 dark:text-slate-400"
                >
                  Upload image
                </label>
                <input
                  class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-gray-500 bg-gray-700 dark:text-slate-400 file:dark:text-slate-400"
                  id="formFileLg"
                  onChange={handleFileChange}
                  type="file"
                />
              </div>
              <div className="flex justify-end gap-4">
                <Link
                  onClick={handleClose}
                  type="button"
                  className="text-white w-[50%] bg-blue-700
            hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5
            py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {" "}
                  back
                </Link>
                <button
                  type="submit"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (
                      formData.name === "" ||
                      formData.email === "" ||
                      formData.mobile === "" ||
                      formData.designation === "" ||
                      formData.course === "" ||
                      formData.gender === ""
                    ) {
                      toast.error("Please fill all the fields");
                      return;
                    }
                    if (!/^\d{10}$/.test(formData.mobile)) {
                      toast.error(
                        "Please enter a valid 10-digit mobile number"
                      );
                      return;
                    }
                    if (
                      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
                    ) {
                      toast.error("Please enter a valid email address");
                      return;
                    }
                    const formDataL = new FormData();
                    formDataL.append("name", formData.name);
                    formDataL.append("email", formData.email);
                    formDataL.append("mobile", formData.mobile);
                    formDataL.append("gender", formData.gender);
                    formDataL.append("designation", formData.designation);
                    formDataL.append("course", formData.course);
                    formData.file
                      ? formDataL.append("file", formData.file)
                      : "";
                    const response = await axios.post(
                      "https://employee-management-system-zeta-eight.vercel.app/admin/add",
                      formDataL,
                      {
                        headers: {
                          Authorization:
                            "Bearer " + localStorage.getItem("token"),
                        },
                      }
                    );
                    if (response.data.success) {
                      toast.success(response.data.message);
                      setEffect(!effect);
                      // setOpen(false);
                      setFormData({
                        name: "",
                        email: "",
                        mobile: "",
                        designation: "",
                        course: "",
                        gender: "",
                      });
                    }
                    // console.log(formData);
                  }}
                  className="text-white w-[50%] bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Continue</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
