import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/slice";

const appReducer = combineReducers({
  authState: authReducer,
});

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
