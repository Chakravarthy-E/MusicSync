import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import playerReducer from "./slices/playerSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
