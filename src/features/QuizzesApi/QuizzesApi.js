import { apiSlice } from "../Api/ApiSlice";

export const QuizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get videos api
    getQuizzes: builder.query({
      query: () => "/quizzes",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // get video api
    getQuize: builder.query({
      query: (quizeId) => `/quizzes/${quizeId}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add video api
    addQuize: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
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
                "getQuizzes",
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

    // edit video api
    editQuize: builder.mutation({
      query: ({ quizeId, data }) => ({
        url: `/quizzes/${quizeId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const quizeUpdate = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            const draftQuize = draft.find((quize) => quize.id == arg.quizeId);
            // console.log(JSON.stringify(draftQuize));
            draftQuize.id = arg.quizeId;
            draftQuize.question = arg.data.question;
            draftQuize.video_id = arg.data.video_id;
            draftQuize.options = arg.data.options;
            draftQuize.video_title = arg.data.video_title;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          quizeUpdate.undo();
        }
      },
    }),

    deleteQuize: builder.mutation({
      query: (quizeId) => ({
        url: `/quizzes/${quizeId}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const quizeDelete = dispatch(
          apiSlice.util.updateQueryData("getQuizzes", undefined, (draft) => {
            return draft.filter((quize) => quize.id != arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          quizeDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useAddQuizeMutation,
  useDeleteQuizeMutation,
  useEditQuizeMutation,
  useGetQuizeQuery,
  useGetQuizzesQuery,
} = QuizzesApi;
