import React from "react";
import Error from "../../../Component/Error/Error";
import { useGetAssignmentMarkQuery } from "../../../features/AssignmentMark/AssignmentMarkApi";
import AssignmentMarkTableRow from "./AssignmentMarkTableRow";

const AssignmentMarks = () => {
  const {
    data: assignmentMark,
    isError,
    isLoading,
    error,
  } = useGetAssignmentMarkQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && assignmentMark?.length === 0) {
    content = <li className="m-2 text-center">No videos found!</li>;
  } else if (!isLoading && !isError && assignmentMark?.length > 0) {
    content = assignmentMark.map((assMark) => (
      <AssignmentMarkTableRow
        key={assMark.id}
        assignmentMark={assMark}
      ></AssignmentMarkTableRow>
    ));
  }

  const pending = assignmentMark?.filter((ass) => ass.status === "pending");

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{assignmentMark ? assignmentMark?.length : 0}</span>
              </li>
              <li>
                Pending <span>{pending ? pending?.length : 0}</span>
              </li>
              <li>
                Mark Sent
                <span>
                  {assignmentMark && pending
                    ? assignmentMark?.length - pending?.length
                    : 0}
                </span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Assignment</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Student Name</th>
                    <th className="table-th">Repo Link</th>
                    <th className="table-th">Mark</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-600/50">
                  {content}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMarks;
