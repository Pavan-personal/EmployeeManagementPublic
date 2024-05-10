import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingAtom } from "../recoil/loadingAtom";
import { employeeListAtom } from "../recoil/employeeListAtom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Loading from "./Loading";
import CoolInputForm from "./AddEmployeeDialog";
import searchAtom from "../recoil/searchAtom";
import { effectLoadAtom } from "../recoil/effectLoadAtom";
import FormDialog from "./EditEmployeeDialog";
import Signin from "./Signin";

function Home() {
  const search = useRecoilValue(searchAtom);
  const [load, setLoad] = useRecoilState(loadingAtom);
  const [list, setList] = useRecoilState(employeeListAtom);
  const effect = useRecoilValue(effectLoadAtom);
  const [duplicateList, setDuplicateList] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      setLoad(true);
      const response = await axios.get("https://employee-management-system-zeta-eight.vercel.app/admin/view", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data.success) {
        setList(response.data.data);
        setDuplicateList(response.data.data);
        console.log(response.data.data);
        setLoad(false);
      } else {
        localStorage.removeItem("token");
        setList([]);
        setLoad(false);
        toast.error(response.data.message);
      }
    };
    localStorage.getItem("token") ? loadData() : "";
  }, [effect]);

  useEffect(() => {
    if (search.length > 0) {
      const filteredList = list.filter((emp) => {
        return (
          emp.name.toLowerCase().includes(search.toLowerCase().trim()) ||
          emp.designation.toLowerCase().includes(search.toLowerCase().trim()) ||
          emp.course.toLowerCase().includes(search.toLowerCase().trim()) ||
          emp.email.toLowerCase().includes(search.toLowerCase().trim()) ||
          emp.mobile.includes(search.trim())
        );
      });
      setList(filteredList);
    } else {
      setList(duplicateList);
    }
  }, [search]);
  return localStorage.getItem("token") !== null ? (
    <div>
      <Navbar />
      {!load ? (
        <div className="overflow-x-auto grid box-borde scale-7 duration-700">
          <div className="hidden md:grid grid-cols-10 bg-slate-300 border-b-2 border-slate-400">
            <div className="text-center col-span-1 text-slate-800 p-4   border-slate-800 font-bold">
              id
            </div>
            <div className="text-center col-span-2 text-slate-800 p-4   border-slate-800 font-bold">
              Name
            </div>
            <div className="text-center col-span-1 text-slate-800 p-4   border-slate-800 font-bold">
              Mobile
            </div>
            <div className="text-center text-slate-800 p-4   border-slate-800 font-bold">
              Designation
            </div>
            <div className="text-center text-slate-800 p-4   border-slate-800 font-bold">
              Gender
            </div>
            <div className="text-center text-slate-800 p-4   border-slate-800 font-bold">
              Course
            </div>
            <div className="text-center text-slate-800 p-4   border-slate-800 font-bold">
              Created at
            </div>
            <div className="text-center col-span-2 text-slate-800 p-4   border-slate-800 font-bold">
              Action
            </div>
          </div>
          {list.map((emp, index) => {
            return <Employee index={index} employee={emp} />;
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  ) : (
    <Signin />
  );
}

export default Home;
