import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NoPath from "../pages/main/NoPath";
import Welcome from "../pages/main/Welcome";
import Login from "../pages/main/Login";
import Home from "../pages/main/Home/Home";
import Quizz_me from "../pages/main/Quizz_me/Quizz_me";
import Performance from "../pages/main/Performance/Perfomance";
import MyQuizzes from "../pages/main/MyQuizzes/MyQuizzes";
import TakeQuiz from "../pages/sub/TakeQuiz/TakeQuiz";
import CreateQuiz from "../pages/sub/CreateQuiz/CreateQuiz";
import ManageQuiz from "../pages/sub/CreateQuiz/ManageQuiz";
import Header from "../components/Header";
import ProtectedRoute from "../routes/ProtectedRoute"; // Imported ProtectedRoute

const MyRoutes = ({ isOpen, setIsOpen }) => {
  return (
    <Routes>
      <Route path="*" element={<NoPath />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/Login" element={<Login />} />

      {/* Wrap all protected routes with a single ProtectedRoute */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Header dropDown={{ isOpen, setIsOpen }} />
          </ProtectedRoute>
        }
      >
        {/* These nested routes will be protected */}
        <Route path="home" element={<Home dropDown={{ isOpen, setIsOpen }} />} />
        <Route
          path="Performance"
          element={<Performance dropDown={{ isOpen, setIsOpen }} />}
        />
        <Route
          path="Quizz_me"
          element={<Quizz_me dropDown={{ isOpen, setIsOpen }} />}
        />
        <Route
          path="MyQuizzes"
          element={<MyQuizzes dropDown={{ isOpen, setIsOpen }} />}
        />
        <Route
          path="CreateQuiz"
          element={<CreateQuiz dropDown={{ isOpen, setIsOpen }} />}
        />
        <Route
          path="ManageQuiz/:id"
          element={<ManageQuiz dropDown={{ isOpen, setIsOpen }} />}
        />
      </Route>

      <Route
        path="/TakeQuiz/:id"
        element={
          <Suspense>
            <TakeQuiz />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default MyRoutes;