import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { effectLoadAtom } from "../recoil/effectLoadAtom";

function Signin() {
  const [effect, setEffect] = useRecoilState(effectLoadAtom);
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-slate-800 px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center text-2xl font-bold tracking-tight py-2 text-white">
        Sign in to your account
      </div>
      <div className="py-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-3">
          <div>
            <label
              htmlFor="email"
              className="block text-slate-200 text-sm font-medium leading-6  "
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-slate-200 text-sm font-medium leading-6  "
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5   shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await axios.post(
                    "https://employee-management-system-zeta-eight.vercel.app/admin/signin",
                    credentials
                  );
                  if (response.data.success) {
                    toast.success("Logged in successfully");
                    localStorage.setItem("token", response.data.token);
                    navigate("/");
                    setEffect(!effect);
                  } else {
                    toast.error(response.data.message);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
