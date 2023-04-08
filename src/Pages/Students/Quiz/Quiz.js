import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../Component/Error/Error";
import {
  useAddQuizMarkMutation,
  useGetQuizMarkQuery,
} from "../../../features/QiuzMark/QuizMarkApi";
import { useGetQuizzesQuery } from "../../../features/QuizzesApi/QuizzesApi";
import { useGetVideoQuery } from "../../../features/Videos/VideosApi";
import QuizItem from "./QuizItem";

const Quiz = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const { data: video } = useGetVideoQuery(videoId);
  const { title, id } = video || {};

  const { data: quizzes, isError, isLoading, error } = useGetQuizzesQuery();

  const thisVideoQuizzes = quizzes?.filter((quiz) => quiz.video_id === id);

  const userAns = useSelector((state) => state.userAns);
  const user = useSelector((state) => state.auth.user);

  const [submitQuize,{isSuccess: quizSubmitSuccess}] =
    useAddQuizMarkMutation();

  const { data: allQuizzes } = useGetQuizMarkQuery();

  const alreadySubmit = allQuizzes?.filter(
    (qu) => qu.student_id === user.id && qu.video_id === id
  );

  useEffect(() => {
    if (quizSubmitSuccess) {
      navigate('/leaderboard')
    }
  },[navigate, quizSubmitSuccess])

  const handleQuizSubmit = (e) => {
    e.preventDefault();

    let trueValues = Object.values(userAns).filter((value) => value === true);
    // Get the count of true values
    const totalQuiz = thisVideoQuizzes.length;
    const totalTrue = trueValues.length;
    const totalWrong = totalQuiz - totalTrue;
    const totalMark = totalTrue * 5;

    const quizMark = {
      student_id: user.id,
      student_name: user.name,
      video_id: id,
      video_title: title,
      totalQuiz: totalQuiz,
      totalCorrect: totalTrue,
      totalWrong: totalWrong,
      totalMark: totalMark,
      mark: 5,
    };
    if (alreadySubmit.length === 0 && totalQuiz > 0) {
      submitQuize(quizMark);
    }
  };

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
  } else if (!isLoading && !isError && thisVideoQuizzes?.length === 0) {
    content = <li className="m-2 text-center">No Quizzes found!</li>;
  } else if (!isLoading && !isError && thisVideoQuizzes?.length > 0) {
    content = thisVideoQuizzes.map((quize, index) => (
      <QuizItem
        key={quize.id}
        handleQuizSubmit={handleQuizSubmit}
        quize={quize}
        index={index}
      ></QuizItem>
    ));
  }

  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Quizzes for "{title}"</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>

          <div className="space-y-8 ">{content}</div>
          <form onSubmit={handleQuizSubmit}>
            <button
              disabled={alreadySubmit?.length > 0}
              type="submit"
              className="px-4 py-2  rounded-full bg-cyan-500 disabled:bg-gray-900 disabled:text-gray-500 block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
            >
              Submit
            </button>
          </form>
          
        </div>
        
      </section>
    </>
  );
};

export default Quiz;
