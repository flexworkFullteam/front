import { configureStore } from '@reduxjs/toolkit';
import { flexworkSlice } from './flexwork/flexworkSlice';

// import { authSlice } from './auth';
// import { uiSlice } from './ui';


export const store = configureStore({
    reducer: {
        // auth: authSlice.reducer,
        flexwork: flexworkSlice.reducer,
        // ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});