import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import AssignmentMarks from "./Pages/Admin/AssignmentMarks/AssignmentMarks";
import Assignments from "./Pages/Admin/Assignments/Assignments";
import AdminLogin from "./Pages/Admin/Authentication/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Quizes from "./Pages/Admin/Quizes/Quizes";
import Videos from "./Pages/Admin/Videos/Videos";
import StudenntRegister from "./Pages/Students/Authentication/StudenntRegister";
import StudentLogin from "./Pages/Students/Authentication/StudentLogin";
import CoursePlayer from "./Pages/Students/CoursePlayer/CoursePlayer";
import LeaderBoard from "./Pages/Students/LeaderBoard/LeaderBoard";
import Quiz from "./Pages/Students/Quiz/Quiz";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentLogin></StudentLogin>}></Route>
          <Route
            path="/register"
            element={<StudenntRegister></StudenntRegister>}
          ></Route>
          <Route path="/player" element={<CoursePlayer />} />
          <Route path="/quize" element={<Quiz />} />
          <Route
            path="/leaderboard"
            element={<LeaderBoard></LeaderBoard>}
          ></Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/assignments" element={<Assignments />} />
          <Route path="/admin/assignment-marks" element={<AssignmentMarks />} />
          <Route path="/admin/quizes" element={<Quizes />} />
          <Route path="/admin/videos" element={<Videos />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
