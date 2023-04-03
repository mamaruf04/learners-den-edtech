import React from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import AssignmentMarks from './Pages/Admin/AssignmentMarks/AssignmentMarks';
import Assignments from './Pages/Admin/Assignments/Assignments';
import AdminLogin from './Pages/Admin/Authentication/AdminLogin';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import Quizes from './Pages/Admin/Quizes/Quizes';
import Videos from './Pages/Admin/Videos/Videos';
// import StudenntRegister from './Pages/Students/Authentication/StudenntRegister';
// import StudentLogin from './Pages/Students/Authentication/StudentLogin';
// import CoursePlayer from './Pages/Students/CoursePlayer/CoursePlayer';
// import LeaderBoard from './Pages/Students/LeaderBoard/LeaderBoard';
// import Quiz from './Pages/Students/Quiz/Quiz';

function App() {
  return (
    <>
    <Navbar></Navbar>
    {/* <CoursePlayer></CoursePlayer>
    <LeaderBoard></LeaderBoard>
    <Quiz></Quiz>
    <StudentLogin></StudentLogin>
    <StudenntRegister></StudenntRegister> */}
    <AdminLogin></AdminLogin>
    <Assignments></Assignments>
    <AssignmentMarks></AssignmentMarks>
    <Dashboard></Dashboard>
    <Quizes></Quizes>
    <Videos></Videos>
    </>
  );
}

export default App;
