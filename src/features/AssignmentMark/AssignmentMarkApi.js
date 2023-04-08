import { apiSlice } from "../Api/ApiSlice";

export const AssignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get assignmentMark api
    getAssignmentMark: builder.query({
      query: () => "/assignmentMark",

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // get single assignmentMark api
    getSingleAssignmentMark: builder.query({
      query: (assignmentMarkId) => `/assignmentMark/${assignmentMarkId}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
        } catch (error) {}
      },
    }),

    // add assignmentMark api
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          // pasimistically update assignmentMark list
          if (response?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMark",
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

    // edit assignmentMark api
    editAssignmentMark: builder.mutation({
      query: ({ assignmentMarkId, data }) => ({
        url: `/assignmentMark/${assignmentMarkId}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const assignmentMarkUpdate = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMark",
            undefined,
            (draft) => {
              const draftassignmentMark = draft.find(
                (assignmentMark) => assignmentMark.id == arg.assignmentMarkId
              );
              // console.log(JSON.stringify(draftVideo));
              draftassignmentMark.student_id = arg.data.student_id;
              draftassignmentMark.student_name = arg.data.student_name;
              draftassignmentMark.assignment_id = arg.data.assignment_id;
              draftassignmentMark.title = arg.data.title;
              draftassignmentMark.createdAt = arg.data.createdAt;
              draftassignmentMark.totalMark = arg.data.totalMark;
              draftassignmentMark.mark = arg.data.mark;
              draftassignmentMark.repo_link = arg.data.repo_link;
              draftassignmentMark.status = arg.data.status;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          assignmentMarkUpdate.undo();
        }
      },
    }),

    deleteAssignmentMark: builder.mutation({
      query: (assignmentMarkId) => ({
        url: `/assignmentMark/${assignmentMarkId}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const assignmentMarkDelete = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMark",
            undefined,
            (draft) => {
              // console.log(JSON.stringify(draft));
              return draft.filter((assignmentMark) => assignmentMark.id != arg);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          assignmentMarkDelete.undo();
        }
      },
    }),
  }),
});

export const {
  useAddAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useGetAssignmentMarkQuery,
  useGetSingleAssignmentMarkQuery,
} = AssignmentMarkApi;
