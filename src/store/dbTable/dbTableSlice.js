import { createSlice } from "@reduxjs/toolkit";

export const dbTableSlice = createSlice({
  name: "dbTable",
  initialState: {
    field: [],
    type: [],
    exp_req: [],
    nationality: [],
    language: [],
    itSkills: [],
  },
  reducers: {
    setField: (state, { payload }) => {
      state.field = payload.flat();
    },

    setType: (state, { payload }) => {
      state.type = payload.flat();
    },

    setExp_req: (state, { payload }) => {
      state.exp_req = payload.flat();
    },
    setNationality: (state, { payload }) => {
      state.nationality = payload.flat();
    },
    setLanguage: (state, { payload }) => {
      state.language = payload.flat();
    },
    setItSkills: (state, { payload }) => {
      state.itSkills = payload.flat();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setField,
  setType,
  setExp_req,
  setNationality,
  setLanguage,
  setItSkills,
} = dbTableSlice.actions;
