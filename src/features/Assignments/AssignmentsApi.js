import { apiSlice } from "../Api/ApiSlice";

export const AssignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get videos api
    getAssignments: builder.query({
      query: () => "/assignments",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // get video api
    getAssignment: builder.query({
      query: (assignmentId) => `/assignments/${assignmentId}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add video api
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          // pasimistically update video list
          if (response?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
                draft.push(response.data);
              })
            );
          }
        } catch (error) {}
      },
    }),

    // edit video api
    editAssignment: builder.mutation({
      query: ({ assignmentId, data }) => ({
        url: `/assignments/${assignmentId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const assignmentUpdate = dispatch(
          apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
            const draftAssignment = draft.find((assignment) => assignment.id == arg.assignmentId);
            // console.log(JSON.stringify(draftVideo));
            draftAssignment.id = arg.assignmentId;
            draftAssignment.title = arg.data.title;
            draftAssignment.video_id = arg.data.video_id;
            draftAssignment.totalMark = arg.data.totalMark;
            draftAssignment.video_title = arg.data.video_title;
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          assignmentUpdate.undo();
        }
      },
    }),

    deleteAssignment: builder.mutation({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const assignmentDelete = dispatch(
          apiSlice.util.updateQueryData("getAssignments", undefined, (draft) => {
            return draft.filter((assignment) => assignment.id != arg);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          assignmentDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentQuery,
  useGetAssignmentsQuery,
} = AssignmentsApi;
