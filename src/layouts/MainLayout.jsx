import React from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <SideNav />
      <Outlet />
    </>
  );
};

export default MainLayout;
