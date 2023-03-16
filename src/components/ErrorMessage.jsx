import Typography from "@mui/material/Typography";
import React from "react";

const ErrorMessage = ({ error }) => {
  return <Typography color="red">{error}</Typography>;
};

export default ErrorMessage;
