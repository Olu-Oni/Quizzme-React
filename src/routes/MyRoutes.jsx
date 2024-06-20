import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

const MyRoutes = ({ isOpen, setIsOpen }) => (
  <Routes>
    <Route index element={<Welcome />} />
    <Route path="/Welcome" element={<Welcome />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/home" element={<Home dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/MyQuizzes" element={<MyQuizzes dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/Performance" element={<Performance dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/Quizz_me" element={<Quizz_me dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/TakeQuiz" element={<TakeQuiz />} />
    <Route path="/CreateQuiz" element={<CreateQuiz dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/ManageQuiz/:id" element={<ManageQuiz dropDown={{ isOpen, setIsOpen }} />} />
    <Route path="/Performance" element={<Performance />} />
    <Route path="*" element={<NoPath />} />
  </Routes>
);

export default MyRoutes;
