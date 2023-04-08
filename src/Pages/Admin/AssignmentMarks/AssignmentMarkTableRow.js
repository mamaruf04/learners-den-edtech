import moment from "moment";
import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../../features/AssignmentMark/AssignmentMarkApi";

const AssignmentMarkTableRow = ({ assignmentMark }) => {
  const {
    id,
    student_id,
    student_name,
    assignment_id,
    title,
    createdAt,
    totalMark,
    mark,
    repo_link,
    status,
  } = assignmentMark || {};

  const [updatedMark, setUpdatedMark] = useState(totalMark);

  const [editAssignmentMark] = useEditAssignmentMarkMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentMarkData = {
      id,
      student_id,
      student_name,
      assignment_id,
      title,
      createdAt,
      totalMark,
      mark: updatedMark,
      repo_link,
      status: "published",
    };
    editAssignmentMark({ assignmentMarkId: id, data: assignmentMarkData });
  };

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">
        {moment(createdAt).format("DD MMM YYYY h:mm:ss A")}
      </td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>
      {status === "published" ? (
        <td class="table-td">{mark}</td>
      ) : (
        <td className="table-td">
          <form onSubmit={handleSubmit} className="input-mark">
            <input
              className="appearance-none"
              onChange={(e) => setUpdatedMark(e.target.value)}
              type="number"
              max={totalMark}
              value={updatedMark}
              required
            />
            <button type="submit">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          </form>
        </td>
      )}
    </tr>
  );
};

export default AssignmentMarkTableRow;
