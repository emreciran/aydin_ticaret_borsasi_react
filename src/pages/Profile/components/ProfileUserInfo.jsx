import { Box, Typography, Slide } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ProfileUserInfo = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
      <Box>
        <Typography>Adı: {user.family_name}</Typography>
        <Typography>Soyadı: {user.given_name}</Typography>
        <Typography>Kullanıcı Adı: {user.name}</Typography>
        <Typography>Email: {user.sub}</Typography>
      </Box>
    </Slide>
  );
};

export default ProfileUserInfo;
