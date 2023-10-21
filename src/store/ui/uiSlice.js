import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isComponent: "proyectos", //* 'datos personales', 'pagos'
  },
  reducers: {
    setComponent: (state, { payload }) => {
      state.isComponent = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setComponent } = uiSlice.actions;
