import React from "react";
import { Link } from "react-router-dom";
import { useGetVideosQuery } from "../../features/Videos/VideosApi";
import Error from "../Error/Error";
import Video from "../Video/Video";

const AllVideos = () => {
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
      <Link key={video.id} to={`/player/${video.id}`}>
        <Video video={video}></Video>
      </Link>
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default AllVideos;
