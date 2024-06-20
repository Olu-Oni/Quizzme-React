import { createContext, useReducer, useState } from "react";
import { ACTIONS, reducer } from "./reducers/reducer";
import dayjs from "dayjs";
import MyRoutes from "./routes/MyRoutes";
import { BrowserRouter } from "react-router-dom";

export const MyStates = createContext();

const initialState = {
  myQuiz: {
    title: "",
    desc: "",
    time: '',
    createdAt: "",
    questions: [],
  },
  isOpen:false
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
    setIsOpen: (value)=>
      dispatch({ type: ACTIONS.SET_ISOPEN, payload: value }),

  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-urbanist max-sm:text-lg min-h-dvh">
      <MyStates.Provider value={{ state, setters }}>
        <BrowserRouter>
          <MyRoutes isOpen={isOpen} setIsOpen={setIsOpen} />
        </BrowserRouter>
      </MyStates.Provider>
    </div>
  );
};

export default App;
