import { apiSlice } from "../Api/ApiSlice";

export const UsersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get uders api
    getUsers: builder.query({
      query: () => "/users",
    }),

    // get uders api
    getSingleUser: builder.query({
      query: (quizeMarkId) => `/quizMark/${quizeMarkId}`,
    }),
  }),
});

export const {
 useGetSingleUserQuery,
 useGetUsersQuery
} = UsersApi;
