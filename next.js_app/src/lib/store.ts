import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
   
    auth: authReducer,
  },
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
