import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { projectSlice } from "./project/projectSlice";
import { uiSlice } from "./ui/uiSlice";
import { dbTableSlice } from "./dbTable/dbTableSlice";

// import { composeWithDevTools } from 'redux-devtools-extension'; // Importa la función composeWithDevTools

// import { authSlice } from './auth';
// import { uiSlice } from './ui';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    project: projectSlice.reducer,
    ui: uiSlice.reducer,
    dbTable: dbTableSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // enhancers: [composeWithDevTools()], // Agrega la función composeWithDevTools como un enhancer
});
