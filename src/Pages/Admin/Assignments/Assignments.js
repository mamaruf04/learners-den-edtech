import React, { useState } from "react";
import Error from "../../../Component/Error/Error";
import AssignmentModal from "../../../Component/Modals/AssignmentModal/AssignmemtModal";
import { useGetAssignmentsQuery } from "../../../features/Assignments/AssignmentsApi";
import AssignmentsTableRow from "./AssignmentsTableRow";

const Assignments = () => {
  const {
    data: assignments,
    isError,
    isLoading,
    error,
  } = useGetAssignmentsQuery();

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
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <li className="m-2 text-center">No videos found!</li>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = assignments.map((assignment) => (
      <AssignmentsTableRow
        key={assignment.id}
        assignment={assignment}
      ></AssignmentsTableRow>
    ));
  }

  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
            <button onClick={handleModalToggle} className="btn ml-auto">
                Add Assignment
              </button>
              {showModal && <AssignmentModal closeModal={handleModalToggle} />}
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Title</th>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Mark</th>
                    <th className="table-th">Action</th>
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

export default Assignments;
