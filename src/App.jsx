import { createContext, useEffect, useReducer, useState } from "react";
import { ACTIONS, reducer } from "./reducers/reducer";
import MyRoutes from "./routes/MyRoutes";
import { useLocation } from "react-router-dom";

export const MyStates = createContext();

const initialState = {
  myQuiz: {
    title: "",
    desc: "",
    time: "00:05",
    createdAt: "",
    questions: [],
  },
  userId: "",
  performance: {},
  isOpen: false,
};
const App = () => {
  const setters = {
    setQuiz: (value) => dispatch({ type: ACTIONS.SET_QUIZ, payload: value }),
    setUser: (value) => dispatch({ type: ACTIONS.SET_USER, payload: value }),
    setQuizTime: (value) =>
      dispatch({ type: ACTIONS.SET_QUIZ_TIME, payload: value }),
    setQuizTitle: (value) =>
      dispatch({ type: ACTIONS.SET_QUIZ_TITLE, payload: value }),
    setQuizDesc: (value) =>
      dispatch({ type: ACTIONS.SET_QUIZ_DESC, payload: value }),
    setQuestions: (value) =>
      dispatch({ type: ACTIONS.SET_QUESTIONS, payload: value }),
    setIsOpen: (value) =>
      dispatch({ type: ACTIONS.SET_ISOPEN, payload: value }),
    setPerformance: (value) =>
      dispatch({ type: ACTIONS.SET_PERFORMANCE, payload: value }),
  };

  const [isOpen, setIsOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Update value based on the current path
    setters.setQuiz(initialState.myQuiz);
  }, [pathname]);

  return (
    <div className="flex flex-col font-urbanist max-sm:text-lg min-h-dvh">
      <MyStates.Provider value={{ state, setters }}>
        <MyRoutes isOpen={isOpen} setIsOpen={setIsOpen} />
      </MyStates.Provider>
    </div>
  );
};

export default App;
