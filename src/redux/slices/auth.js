import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const token = Cookies.get("jwt") || null;
const decodedToken = token ? jwt_decode(token) : false;

const initialState = {
  user:
    decodedToken && Date.now() <= decodedToken.exp * 1000
      ? decodedToken
      : false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isFetching: false,
  message: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        state.isFetching = false;
        state.isSuccess = true;
      } else {
        Cookies.remove("jwt");
      }

      state.user = jwt_decode(action.payload);
    },
    resetState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = false;
      Cookies.remove("jwt");
    },
  },
});

export const { login, logout, resetState } = auth.actions;
export default auth.reducer;
