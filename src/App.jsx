import { createContext, useReducer, useState } from "react";
import { ACTIONS, reducer } from "./reducers/reducer";
import MyRoutes from "./routes/MyRoutes";

export const MyStates = createContext();

const initialState = {
  myQuiz: {
    title: "",
    desc: "",
    time: "",
    createdAt: "",
    questions: [],
  },
  myPerformance: {},
  isOpen: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setters = {
    setQuiz: (value) => dispatch({ type: ACTIONS.SET_QUIZ, payload: value }),
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
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-urbanist max-sm:text-lg min-h-dvh flex flex-col">
      <MyStates.Provider value={{ state, setters }}>
        <MyRoutes isOpen={isOpen} setIsOpen={setIsOpen} />
      </MyStates.Provider>
    </div>
  );
};

export default App;
