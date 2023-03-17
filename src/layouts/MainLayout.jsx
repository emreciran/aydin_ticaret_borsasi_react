import { Container } from "@mui/material";
import React from "react";
import SideNav from "../components/SideNav";

const MainLayout = () => {
  return (
    <Container maxWidth="xl">
      <SideNav />  
    </Container>
  );
};

export default MainLayout;
