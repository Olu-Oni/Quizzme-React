const ACTIONS = {
  SET_QUIZ: "SET_QUIZ",
  SET_QUESTIONS: "SET_QUESTIONS",
  SET_QUIZ_TIME: "SET_QUIZ_TIME",
  SET_QUIZ_TITLE: "SET_QUIZ_TITLE",
  SET_QUIZ_DESC: "SET_QUIZ_DESC",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_QUIZ:
      return { ...state, myQuiz: action.payload };
    case ACTIONS.SET_QUIZ_TIME: {
      const newQuiz = { ...state.myQuiz, time: action.payload.format('HH:mm') };
      return { ...state, myQuiz: newQuiz };
    }
    case ACTIONS.SET_QUIZ_TITLE: {
      const newQuiz = { ...state.myQuiz, title: action.payload };
      return { ...state, myQuiz: newQuiz };
    }
    case ACTIONS.SET_QUIZ_DESC: {
      const newQuiz = { ...state.myQuiz, desc: action.payload };
      return { ...state, myQuiz: newQuiz };
    }
    case ACTIONS.SET_QUESTIONS: {
      const newQuiz = { ...state.myQuiz, questions: action.payload };
      return { ...state, myQuiz: newQuiz };
    }

    // case ACTIONS.SET_CURRENT_QUIZ:
    //   return { ...state, currentQuiz: action.payload };

    default:
      return state;
  }
};

export { ACTIONS, reducer };
