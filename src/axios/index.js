import axios from "axios";
const { REACT_APP_API_URL } = process.env;

export default axios.create({
  baseURL: REACT_APP_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: REACT_APP_API_URL,
  withCredentials: true,
});
