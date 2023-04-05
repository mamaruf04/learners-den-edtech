import React from "react";
import VideoModalForm from "./VideoModalForm";

function VideoModal({ closeModal, video={} }) {

  return (
    <div>
      <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50 fixed top-0 left-0 z-50 ">
        <div className="bg-white rounded-lg p-6 w-[600px]">
          <h2 className="text-3xl font-bold text-gray-900 my-2 text-center">{video.id? 'Edit Video' : 'Add Video'}</h2>
        
          <VideoModalForm video={video} closeModal={closeModal}></VideoModalForm>
        </div>
      </div>
    </div>
  );
}

export default VideoModal;
