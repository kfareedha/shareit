import React from "react";
import { Route, Routes } from "react-router-dom";
import "./Admin.css";
import Sidebar from "../../Admin/Sidebar/Sidebar";

import RightSide from "../../Admin/Rightbar/Rightbar";
import Header from "../../Admin/Header/Header";
const Admin = () => {
  return (
    <div className="admin" style={{ height: "95h" }}>
      <div className="AppGlass">
        <Header />
        <hr />
        <Sidebar />
      </div>
    </div>
  );
};
export default Admin;
