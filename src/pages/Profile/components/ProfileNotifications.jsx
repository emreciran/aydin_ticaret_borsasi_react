import { Box, Slide } from "@mui/material";
import React from "react";

const ProfileNotifications = () => {
  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box>ProfileNotifications</Box>
    </Slide>
  );
};

export default ProfileNotifications;
