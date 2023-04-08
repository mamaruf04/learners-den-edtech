import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    useAddAssignmentMarkMutation,
    useGetAssignmentMarkQuery,
} from "../../../features/AssignmentMark/AssignmentMarkApi";
import { useGetAssignmentsQuery } from "../../../features/Assignments/AssignmentsApi";

const AssignmentSubmitModalForm = ({ closeModal, videoId }) => {
  const [repo_link, setRepo_link] = useState();

  const [isExistAssignment, setIsExistAssignment] = useState();
  const [existError,setExistEerror] = useState();

  const user = useSelector((state) => state.auth.user);

  const { data: assignments } = useGetAssignmentsQuery();

  const selectedAssignment = assignments?.find(
    (assignment) => assignment.video_id === videoId
  );

  const { data: assignmentMarks } = useGetAssignmentMarkQuery();

  useEffect(() => {
    const alreadySubmit = assignmentMarks?.filter(
      (qu) =>
        qu.student_id === user.id && qu.assignment_id === selectedAssignment.id
    );
    setIsExistAssignment(alreadySubmit);
  }, [assignmentMarks, selectedAssignment?.id, user?.id]);

  const [addAssignmentMark, { isSuccess: isSubmitAssignmentSuccess }] =
    useAddAssignmentMarkMutation();


  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    setExistEerror("")
    const assignmentData = {
      title: selectedAssignment.title,
      student_id: user.id,
      student_name: user.name,
      assignment_id: selectedAssignment.id,
      createdAt: date.toISOString(),
      totalMark: selectedAssignment.totalMark,
      mark: null,
      repo_link: repo_link,
      status: "pending",
    };
    if (isExistAssignment.length === 0) {
      addAssignmentMark(assignmentData);  
    }
    else{
        setExistEerror("You already submitted the assignment")
    }
  };

  useEffect(() => {
    if (isSubmitAssignmentSuccess) {
      closeModal();
    }
  }, [isSubmitAssignmentSuccess, closeModal]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoTitle"
          >
            Enter your repository link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoTitle"
            type="text"
            placeholder="Enter repo link"
            value={repo_link}
            onChange={(e) => setRepo_link(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <input
          disable={isExistAssignment?.length !== 0}
            className="text-lg font-medium text-white bg-blue-600 py-2 px-6 rounded-lg disable:bg-gray-900 disable:text-gray-500 hover:bg-blue-700 mr-2"
            id="videoUrl"
            type="submit"
          />
          <button
            className="text-lg font-medium text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        {/* {isAddErr || isEditErr ? (
            <Error message={'Something went wrong!'}></Error>
          ) : null} */}
      </form>
    </>
  );
};

export default AssignmentSubmitModalForm;
