import React from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import StudenntRegister from './Pages/Students/Authentication/StudenntRegister';
import StudentLogin from './Pages/Students/Authentication/StudentLogin';
import CoursePlayer from './Pages/Students/CoursePlayer/CoursePlayer';
import LeaderBoard from './Pages/Students/LeaderBoard/LeaderBoard';
import Quiz from './Pages/Students/Quiz/Quiz';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <CoursePlayer></CoursePlayer>
    <LeaderBoard></LeaderBoard>
    <Quiz></Quiz>
    <StudentLogin></StudentLogin>
    <StudenntRegister></StudenntRegister>
    </>
  );
}

export default App;
