import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isComponent: "proyectos", //* 'datos personales', 'pagos'
    loadingAccount: false,
  },
  reducers: {
    setComponent: (state, { payload }) => {
      state.isComponent = payload;
    },
    setLoadingAccount: (state, { payload }) => {
      state.loadingAccount = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setComponent, setLoadingAccount } = uiSlice.actions;
