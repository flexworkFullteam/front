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
      state.field.push(payload);
    },

    setType: (state, { payload }) => {
      state.type.push(payload);
    },

    setExp_req: (state, { payload }) => {
      state.exp_req.push(payload);
    },
    setNationality: (state, { payload }) => {
      state.nationality.push(payload);
    },
    setLanguage: (state, { payload }) => {
      state.language.push(payload);
    },
    setItSkills: (state, { payload }) => {
      state.itSkills.push(payload);
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
