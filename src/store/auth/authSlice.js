import { createSlice } from "@reduxjs/toolkit";
import profesionalData from "../../utils/profesionals.json";
import companyData from "../../utils/company.json";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // checking, authenticated
    user: {}, //{}, profesionalData
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      // state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      // state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      // state.errorMessage = payload;
    },
    onRegister: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = payload;
      // state.errorMessage = undefined;
    },
    onClearEvents: (state) => {
      state.status = "not-authenticated";
      state.user = {};
      // state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onRegister, onClearEvents } =
  authSlice.actions;
