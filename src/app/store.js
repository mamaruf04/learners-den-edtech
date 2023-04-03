import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/Api/ApiSlice';
import authSliceReducer from "../features/Auth/AuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});
