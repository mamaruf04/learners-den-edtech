import React from "react";
import Modal from "react-modal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import PublicRoute from "./Component/PublicRoute/PublicRoute";
import useAuthCheck from "./Hooks/UseAuthCheck";
import AssignmentMarks from "./Pages/Admin/AssignmentMarks/AssignmentMarks";
import Assignments from "./Pages/Admin/Assignments/Assignments";
import AdminLogin from "./Pages/Admin/Authentication/AdminLogin";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import Quizes from "./Pages/Admin/Quizzes/Quizzes";
import Videos from "./Pages/Admin/Videos/Videos";
import StudenntRegister from "./Pages/Students/Authentication/StudenntRegister";
import StudentLogin from "./Pages/Students/Authentication/StudentLogin";
import CoursePlayer from "./Pages/Students/CoursePlayer/CoursePlayer";
import LeaderBoard from "./Pages/Students/LeaderBoard/LeaderBoard";
import Quiz from "./Pages/Students/Quiz/Quiz";
import AdminRoute from "./Utils/AdminRoute";
import StudentRoute from "./Utils/StudentRoute";
function App() {
  const checkAuth = useAuthCheck();

  Modal.setAppElement("#root");

  return checkAuth ? (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <StudentLogin />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <StudenntRegister />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/player/:videoId"
            element={
              <StudentRoute>
                <CoursePlayer />
              </StudentRoute>
            }
          />
          <Route
            path="/quize/:videoId"
            element={
              <StudentRoute>
                <Quiz />
              </StudentRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <StudentRoute>
                <LeaderBoard />
              </StudentRoute>
            }
          ></Route>
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/assignments"
            element={
              <AdminRoute>
                <Assignments />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/assignment-marks"
            element={
              <AdminRoute>
                <AssignmentMarks />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/quizes"
            element={
              <AdminRoute>
                <Quizes />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/videos"
            element={
              <AdminRoute>
                <Videos />
              </AdminRoute>
            }
          />
          <Route path="/mo" element={<App></App>}></Route>
        </Routes>
      </Router>
    </>
  ) : (
    <div>checking Auth....</div>
  );
}

export default App;
