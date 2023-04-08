import { apiSlice } from "../Api/ApiSlice";

export const QuizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get Mark api
    getQuizMark: builder.query({
      query: () => "/quizMark",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    getSpecificQuizMark: builder.query({
        query: ({userId, videoId}) => `/quizMark?video_id_like=${videoId}&&student_id=${userId}`,
  
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const response = await queryFulfilled;
          } catch (error) {}
        },
      }),

    // get Mark api
    getSingleQuizMark: builder.query({
      query: (quizeMarkId) => `/quizMark/${quizeMarkId}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add Mark api
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          // pasimistically update video list
          if (response?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMark",
                undefined,
                (draft) => {
                  draft.push(response.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    deleteQuize: builder.mutation({
      query: (quizMarkId) => ({
        url: `/quizMark/${quizMarkId}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const quizMarkDelete = dispatch(
          apiSlice.util.updateQueryData("getQuizMark", undefined, (draft) => {
            return draft.filter((quize) => quize.id != arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          quizMarkDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useAddQuizMarkMutation,
  useGetQuizMarkQuery,
  useEditQuizMarkMutation,
  useGetSpecificQuizMarkQuery
} = QuizzesApi;
