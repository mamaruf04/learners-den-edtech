import React, { useEffect, useState } from "react";
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../../features/Videos/VideosApi";
import Error from "../../Error/Error";

const ModalForm = ({ closeModal, video = {} }) => {
  const {
    title: perviousTitle,
    views: perviousView,
    duration: perviousDuration,
    description: perviousDescription,
    url: previousUrl,
  } = video || {};

  const [title, setTitle] = useState(perviousTitle);
  const [description, setDescription] = useState(perviousDescription);
  const [url, setUrl] = useState(previousUrl);
  const [views, setViews] = useState(perviousView);
  const [duration, setDuration] = useState(perviousDuration);

  const [
    addVideo,
    { isSuccess: isAddVideoSuccess, isError: isAddErr},
  ] = useAddVideoMutation();

  const [
    editVideo,
    { isSuccess: isEditVideoSuccess, isError: isEditErr},
  ] = useEditVideoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const videoData = {
      title: title,
      description: description,
      url: url,
      views: views,
      duration: duration,
      createdAt: date.toISOString(),
    };
    if (video.id) {
      editVideo({ videoId: video.id, data: videoData });
    } else {
      addVideo(videoData);
    }
  };

  useEffect(() => {
    if (isAddVideoSuccess || isEditVideoSuccess) {
      closeModal();
    }
  }, [isAddVideoSuccess, closeModal, isEditVideoSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoTitle"
          >
            Video Title
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
            htmlFor="videoUrl"
          >
            Video URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Enter video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoUrl"
          >
            Views
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Enter video Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoUrl"
          >
            Video Duration
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoUrl"
            type="text"
            placeholder="Enter video Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoDescription"
          >
            Video Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="videoDescription"
            placeholder="Enter video description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
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
            <Error message={'Something went wrong!'}></Error>
          ) : null}
      </form>
    </>
  );
};

export default ModalForm;
