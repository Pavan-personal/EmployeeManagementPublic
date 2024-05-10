import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signin from "./components/Signin";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CoolInputForm from "./components/AddEmployeeDialog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<CoolInputForm />} />
      </Routes>
    </>
  );
}

export default App;
