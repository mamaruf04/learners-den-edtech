import React, { useEffect, useState } from "react";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/Assignments/AssignmentsApi";
import { useGetVideosQuery } from "../../../features/Videos/VideosApi";
import Error from "../../Error/Error";

const AssignmentModalForm = ({ closeModal, assignment = {} }) => {
  const {
    title: perviousTitle,
    totalMark: perviousTotalMark,
    video_id: previousVideo_id,
    video_title: previousVideo_title,
  } = assignment || {};

  const [title, setTitle] = useState(perviousTitle);
  const [totalMark, setTotalMark] = useState(perviousTotalMark);
  const [video_id, setVideo_id] = useState(previousVideo_id);

  //   get videos
  const { data: videos, isError, isLoading, error } = useGetVideosQuery();

  //   get assignments
  const { data: assignments } = useGetAssignmentsQuery();

  // add assignment
  const [
    addAssignment,
    { isSuccess: isAddAssignmentSuccess, isError: isAddErr },
  ] = useAddAssignmentMutation();

  //   edit assignment
  const [
    editAssignment,
    { isSuccess: isEditAssignmentSuccess, isError: isEditErr },
  ] = useEditAssignmentMutation();

  //   get the rest videos list where weren't added any assignment.
  const restVideosForAssignment = (video) =>
    !assignments?.some((assignment) => assignment.video_id === video.id);

  //   dropdown handler
  const [selectedOption, setSelectedOption] = useState(previousVideo_title);
  const handleOptionChange = (event) => {
    const videoTitle = event.target.value;
    setSelectedOption(videoTitle);
  };

  //   to get the selected video id.
  useEffect(() => {
    const mySelecteVideo = videos?.find(
      (video) => video.title === selectedOption
    );
    setVideo_id(mySelecteVideo?.id);
  }, [selectedOption, videos]);

  //   dropdown video options
  let content = null;
  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.filter(restVideosForAssignment).map((video) => (
      <option key={video.id} value={video.title}>
        {video.title}
      </option>
    ));
  } else if (!isLoading && !isError && videos?.length === 0) {
    <option>"No video left for assignment."</option>;
  }

  //   handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentData = {
      title,
      totalMark,
      video_id,
      video_title: selectedOption,
    };
    // console.log(assignmentData);
    if (assignment.id) {
      editAssignment({ assignmentId: assignment.id, data: assignmentData });
    } else {
      addAssignment(assignmentData);
    }
  };

  //   when data successfully added or updated modal close automaticlly.
  useEffect(() => {
    if (isAddAssignmentSuccess || isEditAssignmentSuccess) {
      closeModal();
    }
  }, [isAddAssignmentSuccess, closeModal, isEditAssignmentSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoTitle"
          >
            Assignment Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoTitle"
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Video Category
          </label>
          <select
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-gray-700"
            name="category"
            id="category"
            required
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value={assignment.id ? previousVideo_title : ""}>
              {assignment.id ? previousVideo_title : "Select a video"}
            </option>
            {content}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoUrl"
          >
            Total Mark
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Enter video URL"
            value={totalMark}
            onChange={(e) => setTotalMark(e.target.value)}
            required
          />
        </div>

        {/* checking any video rest to take assignment */}
        {videos?.filter(restVideosForAssignment).length === 0 ? (
          <Error message={"No video rest to take assignment"}></Error>
        ) : null}

        <div className="flex justify-center mt-6">
          <input
            className="text-lg font-medium text-white bg-blue-600 py-2 px-6 rounded-lg hover:bg-blue-700 mr-2"
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
        {isAddErr || isEditErr ? (
          <Error message={"Something went wrong!"}></Error>
        ) : null}
      </form>
    </>
  );
};

export default AssignmentModalForm;
