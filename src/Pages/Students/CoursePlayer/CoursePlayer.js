import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AllVideos from "../../../Component/AllVideos/AllVideos";
import AssignmentSubmitModal from "../../../Component/Modals/AssignmentSubmitModal/AssignmentSubmitModal";
import { useGetAssignmentsQuery } from "../../../features/Assignments/AssignmentsApi";
import { useGetVideoQuery } from "../../../features/Videos/VideosApi";

const CoursePlayer = () => {
  const { videoId } = useParams();

  const { data: video } = useGetVideoQuery(videoId);
  const [hasAssignment, setHasAssignment] = useState();

  const { data: assignments } = useGetAssignmentsQuery();

  const { title, description, url, views, duration, createdAt, id } =
    video || {};

  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const checkHasAssignment = assignments?.filter(
      (assignment) => assignment.video_id == videoId
    );
    setHasAssignment(checkHasAssignment);
  }, [assignments, videoId]);

  console.log(hasAssignment);

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <iframe
                width="100%"
                className="aspect-video"
                src={url}
                title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                  {title}
                </h1>
                <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                  Uploaded on {moment(createdAt).format("ll")}
                </h2>

                <div className="flex gap-4">
                  {hasAssignment?.length > 0 ? (
                    <span
                      onClick={handleModalToggle}
                      className="cursor-pointer px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                    >
                      এসাইনমেন্ট
                    </span>
                  ) : null}

                  <Link
                    to={`/quize/${id}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
                  >
                    কুইজে অংশগ্রহণ করুন
                  </Link>
                </div>
                <p className="mt-4 text-sm text-slate-400 leading-6">
                  {description}
                </p>
              </div>
            </div>
            <AllVideos></AllVideos>
          </div>
        </div>
        {showModal && (
          <AssignmentSubmitModal videoId={id} closeModal={handleModalToggle} />
        )}
      </section>
    </>
  );
};

export default CoursePlayer;
