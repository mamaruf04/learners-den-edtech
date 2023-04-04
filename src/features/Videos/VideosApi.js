import { apiSlice } from "../Api/ApiSlice";

export const VideosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get videos api
    getVideos: builder.query({
      query: () => "/videos",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add videos api
    addVideos: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetVideosQuery, useAddVideosMutation} = VideosApi;
