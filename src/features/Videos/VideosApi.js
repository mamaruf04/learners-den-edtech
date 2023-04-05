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

    // get video api
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add video api
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          // pasimistically update video list
          if (response?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(response.data);
              })
            );
          }
        } catch (error) {}
      },
    }),

    // edit video api
    editVideo: builder.mutation({
      query: ({ videoId, data }) => ({
        url: `/videos/${videoId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const videoUpdate = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            const draftVideo = draft.find((video) => video.id == arg.videoId);
            // console.log(JSON.stringify(draftVideo));
            draftVideo.id = arg.videoId;
            draftVideo.title = arg.data.title;
            draftVideo.description = arg.data.description;
            draftVideo.url = arg.data.url;
            draftVideo.views = arg.data.views;
            draftVideo.duration = arg.data.duration;
            draftVideo.createdAt = arg.data.createdAt;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          videoUpdate.undo();
        }
      },
    }),

    deleteVideo: builder.mutation({
      query: (videoId) => ({
        url: `/videos/${videoId}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const videoDelete = dispatch(
          apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
            console.log(JSON.stringify(draft));
            return draft.filter((video) => video.id != arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          videoDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useGetVideoQuery,
  useEditVideoMutation,
  useDeleteVideoMutation
} = VideosApi;
