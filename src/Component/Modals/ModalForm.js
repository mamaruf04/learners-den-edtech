import React, { useState } from "react";

const ModalForm = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoData = {
      title: title,
      description: description,
      url: url,
      views: views,
      duration: duration,
    };
    console.log(videoData);
  };
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
      </form>
    </>
  );
};

export default ModalForm;
