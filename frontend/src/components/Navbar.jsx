import React from "react";
import searchAtom from "../recoil/searchAtom";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { effectLoadAtom } from "../recoil/effectLoadAtom";
import toast from "react-hot-toast";
// import AddBoxIcon from '@mui/icons-material/AddBox';

function Navbar() {
  const [searchValue, setSearchValue] = useRecoilState(searchAtom);
  const [effect, setEffect] = useRecoilState(effectLoadAtom);
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900 py-3">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex justify-center items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4974/4974985.png"
            class="h-8"
            alt="Flowbite Logo"
          />
          <div class="text-slate-300 text-xl font-semibold">
            Employee Management
          </div>
        </div>
        <div class="flex md:order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span class="sr-only">Search</span>
          </button>
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <button
            data-collapse-toggle="navbar-search"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div class="relative mt-3 md:hidden">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 cursor-pointer select-none dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 text-[1rem] rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <div class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-slate-300 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer select-none md:dark:hover:bg-transparent dark:border-gray-700">
                Home
              </div>
            </li>
            <AddEmployeeDialog />
            {/* <li>
              <Link
                to={"/add"}
                class="block rounded-[0.25rem] text-[1rem] px-2 pb-0.5 duration-500 text-slate-200 select-none hover:text-white cursor-pointer bg-blue-600"
              >
                add +
              </Link>
            </li> */}
            <li>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully");
                  setEffect(!effect);
                }}
                class="block rounded-[0.25rem] text-[1rem] px-2 pb-0.5 duration-500 text-slate-200 select-none hover:text-white cursor-pointer bg-red-600"
              >
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
