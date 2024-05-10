import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { effectLoadAtom } from "../recoil/effectLoadAtom";
import toast from "react-hot-toast";

export default function FormDialog(props) {
  const [effect, setEffect] = useRecoilState(effectLoadAtom);
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState(props.employee);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen} className="cursor-pointer" title="Edit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 fill-blue-500 hover:fill-blue-700"
          viewBox="0 0 348.882 348.882"
        >
          <path
            d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
            data-original="#000000"
          />
          <path
            d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
            data-original="#000000"
          />
        </svg>
      </button>

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
          <form className=" w-[21rem] md:min-w-[26rem] bg-slate-800 scale-[1.04] bg-slate-00 rounded-lg px-10 py-6 flex flex-col gap-3">
            <div className="font-bold text-2xl opacity-85 text-slate-400 text-center pb-1">
              Edit Employee
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
                  value={employee.name}
                  onChange={(e) => {
                    setEmployee({ ...employee, name: e.target.value });
                  }}
                  placeholder="Enter employee name"
                  required
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
                  value={employee.mobile}
                  onChange={(e) => {
                    setEmployee({ ...employee, mobile: e.target.value });
                  }}
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
                value={employee.email}
                onChange={(e) => {
                  setEmployee({ ...employee, email: e.target.value });
                }}
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
                      checked={employee.gender === "Female"}
                      onChange={(e) => {
                        setEmployee({ ...employee, gender: e.target.value });
                      }}
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
                      checked={employee.gender === "Male"}
                      onChange={(e) => {
                        setEmployee({ ...employee, gender: e.target.value });
                      }}
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
            <div className="flex items-center gap-3 box-border">
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
                  value={employee.designation}
                  onChange={(e) =>
                    setEmployee({ ...employee, designation: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white font-semibold dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select your designation</option>
                  <option>Manager</option>
                  <option>HR</option>
                  <option>Sales</option>
                </select>
              </div>
              <div className="w-[50%]">
                <label
                  htmlFor="course"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={employee.course}
                  onChange={(e) => {
                    setEmployee({ ...employee, course: e.target.value });
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select course</option>
                  <option>BSC</option>
                  <option>BCA</option>
                  <option>MCA</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label
                for="formFileLg"
                class="mb-2 text-sm font-semibold inline-block text-gray-900 dark:text-slate-400"
              >
                Upload image
              </label>
              <input
                onChange={(e) => {
                  setEmployee({ ...employee, file: e.target.files[0] });
                }}
                class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-gray-500 bg-gray-700 dark:text-slate-400 file:dark:text-slate-400"
                id="formFileLg"
                type="file"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Link
                // to="/home"
                onClick={handleClose}
                type="button"
                className="text-white w-[50%] bg-blue-700
            hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5
            py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {" "}
                back
              </Link>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    if (
                      employee.name === "" ||
                      employee.email === "" ||
                      employee.mobile === "" ||
                      employee.designation === "" ||
                      employee.course === "" ||
                      employee.gender === ""
                    ) {
                      toast.error("Please fill all the fields");
                      return;
                    }
                    if (!/^\d{10}$/.test(employee.mobile)) {
                      toast.error(
                        "Please enter a valid 10-digit mobile number"
                      );
                      return;
                    }
                    if (
                      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(employee.email)
                    ) {
                      toast.error("Please enter a valid email address");
                      return;
                    }
                    const formData = new FormData();
                    formData.append("name", employee.name);
                    formData.append("email", employee.email);
                    formData.append("mobile", employee.mobile);
                    formData.append("designation", employee.designation);
                    formData.append("course", employee.course);
                    formData.append("gender", employee.gender);
                    employee.file
                      ? formData.append("file", employee.file)
                      : "";
                    const response = await axios.put(
                      "https://employee-management-system-zeta-eight.vercel.app/admin/edit/" + employee._id,
                      formData,
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
                      handleClose();
                    } else {
                      toast.error(response.data.message);
                      return;
                    }
                  } catch (error) {
                    console.log(error);
                    return;
                  }
                  console.log(employee);
                }}
                type="submit"
                className="text-white w-[50%] bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Continue</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}
