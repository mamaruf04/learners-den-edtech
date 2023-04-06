import React, { useState } from "react";
import Error from "../../../Component/Error/Error";
import QuizModal from "../../../Component/Modals/QuizeModal/QuizModal";
import { useGetQuizzesQuery } from "../../../features/QuizzesApi/QuizzesApi";
import QuizzesTableRow from "./QuizzesTableRow";

const Quizes = () => {


  const {
    data: quizzes,
    isError,
    isLoading,
    error,
  } = useGetQuizzesQuery();

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
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <li className="m-2 text-center">No Quizzes found!</li>;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = quizzes.map((quize) => (
      <QuizzesTableRow
        key={quize.id}
        quize={quize}
      ></QuizzesTableRow>
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
              <button onClick={handleModalToggle} className="btn ml-auto">Add Quiz</button>
              {showModal && <QuizModal closeModal={handleModalToggle} />}
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="divide-y-1 text-base divide-gray-600 w-full">
                <thead>
                  <tr>
                    <th className="table-th">Question</th>
                    <th className="table-th">Video</th>
                    <th className="table-th justify-center">Action</th>
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

export default Quizes;
