import React from "react";
import { Link } from "react-router-dom";

const AllVideos = () => {
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      <Link to={`/player/3`}>
        <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
          {/* <!-- Thumbnail --> */}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
          {/* <!-- Description --> */}
          <div clas="flex flex-col w-full">
              <p className="text-slate-50 text-sm font-medium">
                Things I wish I knew as a Junior Web Developer - Sumit Saha -
                BASIS SoftExpo 2023
              </p>
            <div>
              <span className="text-gray-400 text-xs mt-1">34.5 Mins</span>
              <span className="text-gray-400 text-xs mt-1"> | </span>
              <span className="text-gray-400 text-xs mt-1">241K views</span>
            </div>
          </div>
        </div>
      </Link>

      <Link to={`/player/4`}>
        <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
          {/* <!-- Thumbnail --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
          {/* <!-- Description --> */}
          <div clas="flex flex-col w-full">
              <p className="text-slate-50 text-sm font-medium">
                Introduction to Couse
              </p>
            <div>
              <span className="text-gray-400 text-xs mt-1">34.5 Mins</span>
              <span className="text-gray-400 text-xs mt-1"> | </span>
              <span className="text-gray-400 text-xs mt-1">241K views</span>
            </div>
          </div>
        </div>
      </Link>

      <Link to={`/player/5`}>
        <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2">
          {/* <!-- Thumbnail --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
          {/* <!-- Description --> */}
          <div clas="flex flex-col w-full">
              <p className="text-slate-50 text-sm font-medium">
                Introduction to Couse
              </p>
            <div>
              <span className="text-gray-400 text-xs mt-1">34.5 Mins</span>
              <span className="text-gray-400 text-xs mt-1"> | </span>
              <span className="text-gray-400 text-xs mt-1">241K views</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AllVideos;