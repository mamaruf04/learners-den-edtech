import React, { useEffect, useState } from "react";
import {
    useAddQuizeMutation,
    useEditQuizeMutation,
} from "../../../features/QuizzesApi/QuizzesApi";
import { useGetVideosQuery } from "../../../features/Videos/VideosApi";
import Error from "../../Error/Error";

const QuizModalForm = ({ closeModal, quize = {} }) => {
  const {
    question: perviousQuestion,
    video_id: previousVideo_id,
    video_title: previousVideo_title,
    options: previousOptions,
  } = quize || {};

  const [question, setQuestion] = useState(perviousQuestion);
  const [video_id, setVideo_id] = useState(previousVideo_id);

  // quiz options state. optional chaining used for detact edit or add
  const [options, setOptions] = useState(
    previousOptions
      ? previousOptions?.map((op) => ({
          id: op.id,
          option: op.option,
          isCorrect: op.isCorrect,
        }))
      : [
          { id: "1", option: "", isCorrect: true },
          { id: "2", option: "", isCorrect: false },
          { id: "3", option: "", isCorrect: false },
          { id: "4", option: "", isCorrect: false },
        ]
  );

  //   copy the options array and update the value for quiz option
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index].option = e.target.value;
    setOptions(newOptions);
  };

  //   copy the options array and update the value for quiz isCorrect
  const handleIsCorrectChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = e.target.checked;
    setOptions(newOptions);
  };

  //   get videos
  const { data: videos, isError, isLoading } = useGetVideosQuery();

  // add Quize
  const [addQuize, { isSuccess: isAddQuizeSuccess, isError: isAddErr }] =
    useAddQuizeMutation();

  //   edit Quize
  const [editQuize, { isSuccess: isEditQuizeSuccess, isError: isEditErr }] =
    useEditQuizeMutation();

  //   dropdown handler
  const [selectedOption, setSelectedOption] = useState(previousVideo_title);
  const handleSelectedOptionChange = (event) => {
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
    content = videos.map((video) => (
      <option key={video.id} value={video.title}>
        {video.title}
      </option>
    ));
  }

  //   handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const quizeData = {
      question,
      video_id,
      video_title: selectedOption,
      options,
    };
    console.log(quizeData);
    if (quize.id) {
      editQuize({ quizeId: quize.id, data: quizeData });
    } else {
      addQuize(quizeData);
    }
  };

  //   when data successfully added or updated modal close automaticlly.
  useEffect(() => {
    if (isAddQuizeSuccess || isEditQuizeSuccess) {
      closeModal();
    }
  }, [isAddQuizeSuccess, closeModal, isEditQuizeSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Videos
          </label>
          <select
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-gray-700"
            name="category"
            id="category"
            required
            value={selectedOption}
            onChange={handleSelectedOptionChange}
          >
            <option value={""}>Select a video</option>
            {content}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoUrl"
          >
            Question
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>


        {/* quiz option handeling start*/}
        {options.map((option, index) => (
          <div key={option.id}>
            <label className="text-gray-700 font-bold mb-2">
              Option {option.id}:
              <input
                className="shadow appearance-none border rounded  py-1 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={option.option}
                onChange={(e) => handleOptionChange(e, index)}
                required
              />
            </label>
            <label className="text-gray-700 font-bold m-6">
              Is Correct :
              <input
                className="mx-1"
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => handleIsCorrectChange(e, index)}
              />
            </label>
            <br />
          </div>
        ))}

        {/* quiz option handeling end*/}

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

export default QuizModalForm;
