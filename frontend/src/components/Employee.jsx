import React from "react";
import DeleteDialog from "./DeleteDialog";
import FormDialog from "./EditEmployeeDialog";

function Employee(props) {
  const date = new Date(props.employee.createdDate);
  const formatedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-10 ${
        props.index % 2 !== 0 ? "bg-slate-300" : "bg-slate-200"
      }`}
    >
      <div className="text-sm p-4 col-span-1 flex justify-center items-center   border-slate-800">
        {props.index + 1}
      </div>
      <div className="text-sm p-4 md:col-span-2 flex justify-center md:justify-start items-center border-slate-800">
        <div className="flex items-center justify-center cursor-pointer">
          <img
            src={
              props.employee.profileImage ||
              "https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            }
            className="w-9 h-9 rounded-full shrink-0"
          />
          <div className="ml-2 scale-95">
            <p className=" text-base font-semibold text-slate-800">
              {props.employee.name}
            </p>
            <p className="text-sm text-gray-500">{props.employee.email}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-4   border-slate-800">
        {props.employee.mobile}
      </div>
      <div className="flex justify-center items-center p-4   border-slate-800">
        {props.employee.designation}
      </div>
      <div className="flex justify-center items-center p-4   border-slate-800">
        {props.employee.gender}
      </div>
      <div className="flex justify-center items-center p-4   border-slate-800">
        {props.employee.course}
      </div>
      <div className="flex justify-center items-center p-4   border-slate-800">
        {formatedDate}
      </div>
      <div className="flex justify-center md:col-span-2 gap-5 items-center p-4   border-slate-800">
        <FormDialog employee={props.employee} />
        <DeleteDialog eid={props.employee._id} />
      </div>
    </div>
  );
}

export default Employee;
