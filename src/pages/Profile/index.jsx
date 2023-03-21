import React from "react";
import Box from "@mui/material/Box";
import ProfileTabs from "./components/ProfileTabs";

const Profile = () => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <ProfileTabs />
    </Box>
  );
};

export default Profile;
