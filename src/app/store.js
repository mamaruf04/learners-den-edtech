import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/Api/ApiSlice';
import authSliceReducer from "../features/Auth/AuthSlice";
import userAns from "../features/QuizzesApi/QuizzesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath] : apiSlice.reducer,
    auth: authSliceReducer,
    userAns: userAns,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});
