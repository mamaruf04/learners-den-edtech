import React from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentMarkQuery } from "../../../features/AssignmentMark/AssignmentMarkApi";
import { useGetQuizMarkQuery } from "../../../features/QiuzMark/QuizMarkApi";
import { useGetUsersQuery } from "../../../features/Users/UsersApi";

const LeaderBoard = () => {
  // const [users, setUsers] = useState([]);
  // const [assignmentMark, setassignmentMark] = useState([]);
  // const [quizeMarks, setQuizeMarks] = useState([]);
  const my = useSelector((state) => state.auth.user);

  const {
    data: getUsers,
    isSuccess: succUser,
    isLoading: userLoading,
  } = useGetUsersQuery();

  const {
    data: getAssignmentMark,
    isLoading: assignmentLoading,
    error,
  } = useGetAssignmentMarkQuery();

  const { data: allQuizzes, isLoading: quizLoading } = useGetQuizMarkQuery();

  if (userLoading || assignmentLoading || quizLoading) {
    return <div>loading...</div>;
  }

  // function to get the total assignment mark of a student
  function getTotalAssignmentMark(studentId) {
    return getAssignmentMark
      .filter((assignment) => assignment.student_id === studentId)
      .reduce((total, assignment) => total + parseInt(assignment.mark), 0);
  }

  // function to get the total quiz mark of a student
  function getTotalQuizMark(studentId) {
    return allQuizzes
      .filter((quiz) => quiz.student_id === studentId)
      .reduce((total, quiz) => total + parseInt(quiz.mark), 0);
  }

  // -------------------------------------------------

  // function to get the leaderboard
  function getLeaderboard() {
    const leaderboard = [];

    // loop through all the users
    for (const user of getUsers) {
      // ignore admin users
      if (user.role === "admin") continue;

      const studentId = user.id;
      const studentName = user.name;
      const totalQuizMark = getTotalQuizMark(studentId);
      const totalAssignmentMark = getTotalAssignmentMark(studentId);
      const totalMark = totalQuizMark + totalAssignmentMark;

      leaderboard.push({
        id: studentId,
        name: studentName,
        quizMark: totalQuizMark,
        assignmentMark: totalAssignmentMark,
        totalMark: totalMark,
      });
    }

    // initialize rank to 1
    let rank = 1;

    // sort leaderboard by total marks + total quiz marks in descending order
    leaderboard.sort((a, b) => b.totalMark - a.totalMark);

    // loop over sorted leaderboard and assign ranks
    for (let i = 0; i < leaderboard.length; i++) {
      if (i > 0 && leaderboard[i].totalMark !== leaderboard[i - 1].totalMark) {
        // increment rank only if the current student's total marks + total quiz marks is less than the previous student's total marks + total quiz marks
        rank++;
      }

      // assign rank to current student
      leaderboard[i].rank = rank;
    }

    return leaderboard;
  }

  // example usage
  const leaderboard = getLeaderboard();

  const myRank = leaderboard.find((user) => user.id === my?.id);
  console.log(myRank);

  const top20 = leaderboard.slice(0, 20);

  // ------------------------------------------------

  // console.log(users);
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr>
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-2 border-cyan">
                  <td className="table-td text-center font-bold">
                    {myRank.rank}
                  </td>
                  <td className="table-td text-center font-bold">
                    {myRank.name}
                  </td>
                  <td className="table-td text-center font-bold">
                    {myRank.quizMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {myRank.assignmentMark}
                  </td>
                  <td className="table-td text-center font-bold">
                    {myRank.totalMark}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="table-th !text-center">Rank</th>
                  <th className="table-th !text-center">Name</th>
                  <th className="table-th !text-center">Quiz Mark</th>
                  <th className="table-th !text-center">Assignment Mark</th>
                  <th className="table-th !text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {top20.map((user) => (
                  <tr className="border-b border-slate-600/50">
                    <td className="table-td text-center">{user.rank}</td>
                    <td className="table-td text-center">{user.name}</td>
                    <td className="table-td text-center">{user.quizMark}</td>
                    <td className="table-td text-center">
                      {user.assignmentMark}
                    </td>
                    <td className="table-td text-center">{user.totalMark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
