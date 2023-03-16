import axios from "../axios";

export const RegisterUser = async (data) =>
  await axios.post("/auth/register", data);

export const LoginUser = async (data) =>
  await axios.post("/auth/login", data, { withCredentials: true });
