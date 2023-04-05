import React, { useState } from "react";
import Error from "../../../Component/Error/Error";
import AddVideoModal from "../../../Component/Modals/VideoModal/VideoModal";
import { useGetVideosQuery } from "../../../features/Videos/VideosApi";
import VideoTableRow from "./VideoTableRow";

const Videos = () => {
  const { data: videos, isError, isLoading, error } = useGetVideosQuery();

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
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <li className="m-2 text-center">No videos found!</li>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <VideoTableRow key={video.id} video={video}></VideoTableRow>
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
                Add Video
              </button>
              {showModal && <AddVideoModal closeModal={handleModalToggle} />}
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
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

export default Videos;
