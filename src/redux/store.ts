import { combineReducers, configureStore } from '@reduxjs/toolkit';
import petReducer from './petSlice/slice';
import homeReducer from './homeSlice/slice';

const appReducer = combineReducers({
  petState: petReducer,
  homeState: homeReducer,
});

export const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
