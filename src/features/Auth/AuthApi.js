import { apiSlice } from "../Api/ApiSlice";
import { userLogedIn } from "./AuthSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register api
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),

      //  here accesstoken saved in localstorage. cause i can get it next reload to check is user loggedin or not.

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            "Auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );

          dispatch(
            userLogedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error) {}
      },
    }),

    // login api
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          localStorage.setItem(
            "Auth",
            JSON.stringify({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );

          dispatch(
            userLogedIn({
              accessToken: response.data.accessToken,
              user: response.data.user,
            })
          );
        } catch (error) {}
      },
    }),
  }),
});

export const {useLoginMutation, useRegisterMutation} = authApi;
