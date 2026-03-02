import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-100 pt-5 pb-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
