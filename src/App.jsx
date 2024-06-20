import { createContext, useReducer, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPath from "./pages/main/NoPath";
import Welcome from "./pages/main/Welcome";
import Login from "./pages/main/Login";
import Home from "./pages/main/Home/Home";
import Quizz_me from "./pages/main/Quizz_me/Quizz_me";
import Performance from "./pages/main/Performance/Perfomance";
import MyQuizzes from "./pages/main/MyQuizzes/MyQuizzes";
import TakeQuiz from "./pages/sub/TakeQuiz/TakeQuiz";
import CreateQuiz from "./pages/sub/CreateQuiz/CreateQuiz";
import { ACTIONS, reducer } from "./reducers/reducer";
import ManageQuiz from "./pages/sub/CreateQuiz/ManageQuiz";
import dayjs from "dayjs";

export const MyStates = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    myQuiz: {
      title: "",
      desc: "",
      time: dayjs().hour(0).minute(15).format("HH:mm"),
      createdAt: "",
      questions: [],
    },
  });

  const setQuiz = (value) =>
    dispatch({ type: ACTIONS.SET_QUIZ, payload: value });
  const setQuizTime = (value) =>
    dispatch({ type: ACTIONS.SET_QUIZ_TIME, payload: value });
  const setQuizTitle = (value) =>
    dispatch({ type: ACTIONS.SET_QUIZ_TITLE, payload: value });
  const setQuizDesc = (value) =>
    dispatch({ type: ACTIONS.SET_QUIZ_DESC, payload: value });
  const setQuestions = (value) =>
    dispatch({ type: ACTIONS.SET_QUESTIONS, payload: value });
  // const setCurrentQuiz = (value) => dispatch({type:ACTIONS.SET_CURRENT_QUIZ, payload:value})
  const setters = {
    setQuiz,
    setQuizTime,
    setQuizTitle,
    setQuizDesc,
    setQuestions,
  };
 const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="font-urbanist max-sm:text-lg  min-h-dvh">
      <MyStates.Provider value={{ state, setters }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/home"
              element={<Home dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route
              path="/MyQuizzes"
              element={<MyQuizzes dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route
              path="/Performance"
              element={<Performance dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route
              path="/Quizz_me"
              element={<Quizz_me dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route path="/TakeQuiz" element={<TakeQuiz />} />
            <Route
              path="/CreateQuiz"
              element={<CreateQuiz dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route
              path="/ManageQuiz/:id"
              element={<ManageQuiz dropDown={{ isOpen, setIsOpen }} />}
            />
            <Route path="/Performance" element={<Performance />} />
            <Route path="*" element={<NoPath />} />
          </Routes>
        </BrowserRouter>
      </MyStates.Provider>
    </div>
  );
};

export default App;
