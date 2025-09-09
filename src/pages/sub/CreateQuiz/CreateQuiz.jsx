import { useState, useContext } from "react";
import NewQuestion from "./NewQuestion";
import MyNotification from "../../../components/MyNotifications";
import { Modal, Time } from "./OtherSubs";
import { addQuiz } from "../../../services/quiz";
import { MyStates } from "../../../App";

// Main component
const Main = ({ myQuiz, myQuestion, setModalVisible, buttonDisabled }) => {
  const { questionCount, setQuestionCount } = myQuestion;
  const { quiz, setters } = myQuiz;
  //check if all inputs are filled

  const handleCreate = () => {
    const titleValid = quiz.title.split(" ").join("") !== "";

    const questionsValid = questionCount.every(
      (question) => question.content.split(" ").join("") !== ""
    );
    let optionsValid = questionCount.every((question) =>
      question.options.every((opt) => opt.content.split(" ").join("") !== "")
    );
    const correctOptValid = questionCount.every(
      (question) => question.correctOption.length > 0
    );

    if (titleValid && questionsValid && optionsValid && correctOptValid) {
      setModalVisible();
    }
  };

  //new Questions
  const QuNum = questionCount.length + 1;
  const addQuestion = () => {
    const newQuestion = {
      id: `Qu${QuNum}`,
      userId: `User1`,
      content: "",
      type: "multiChoice",
      correctOption: [],
      options: [],
    };
    setQuestionCount([...questionCount.concat(newQuestion)]);
  };

  //delete existing questions
  const deleteQuestion = (id) => {
    const newQuestions = questionCount.filter((q) => q.id !== id);
    setQuestionCount(newQuestions);
  };

  return (
    <main className="flex flex-col items-center lg:mx-36 mb-5 px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <h1 className="text-green-900">Create your Quiz</h1>
      <div className="flex flex-col bg-white rounded-t-3xl mt-5 w-full min-h-[200px] shadow-lg p-4">
        <div className="flex justify-between max-sm:flex-col">
          <input
            type="text"
            name="title"
            required
            placeholder="Quiz Title*"
            value={quiz.title}
            onChange={(e) => setters.setQuizTitle(e.target.value)}
            className="focus:bg-slate-200 min-w-48 w-[50%] m-3 p-2 pb-0 bg-opacity-35 focus:border-b border-black outline-none text-3xl placeholder:text-gray-500"
          />
          <Time myQuiz={myQuiz} />
        </div>
        <textarea
          name="desc"
          placeholder="Quiz Description"
          value={quiz.desc}
          onChange={(e) => setters.setQuizDesc(e.target.value)}
          className="bg-slate-100 max-h-[50%] m-3 p-2 pb-0 bg-opacity-35 border-b border-black outline-none text-lg resize-none"
        />
      </div>
      {questionCount.map((question) => (
        <NewQuestion
          key={question.id}
          question={question}
          myQuestion={myQuestion}
          deleteQuestion={deleteQuestion}
        />
      ))}
      <a
        onClick={addQuestion}
        className="flex bg-white transition-none rounded-3xl mt-5 p-2 w-full min-h-[50px] text-gray-500 hover:text-black hover:outline outline-gray-300 cursor-pointer"
      >
        <p id="addOption" className="pb-0 m-auto addQuestion">
          New Question
        </p>
      </a>
      {questionCount.length > 0 ? (
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={handleCreate}
          className={`flex bg-green-300 rounded-3xl mt-5 p-2 w-[90%] min-h-[50px] shadow-lg hover:text-black hover:bg-green-400 hover:scale-105 cursor-pointer`}
        >
          <p id="addOption" className="pb-0 m-auto text-xl ">
            Create
          </p>
        </button>
      ) : null}
    </main>
  );
};

//notification component
const Notification = ({ myNotify }) => {
  const { notification, setNotification } = myNotify;
  return (
    <MyNotification
      notification={notification}
      setNotification={setNotification}
      time={3000}
    >
      <h2 className="mx-auto my-4 text-xl text-green-700">{notification}</h2>
      <h3>You will be redirected to another page soon</h3>
    </MyNotification>
  );
};

// CreateQuiz component
const CreateQuiz = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { state, setters } = useContext(MyStates);

  // locally stored userId
  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? JSON.parse(userId) : null;


  const myQuestion = {
    questionCount: state.myQuiz.questions,
    setQuestionCount: setters.setQuestions,
  };
  const myQuiz = { quiz: state.myQuiz, setters };
  const myNotify = { notification, setNotification };

  const quizDone = () => {
    // setModalVisible();
    setNotification("Quiz submitted!!!");
    setButtonDisabled(true);
  };

  const handleSubmit = (e) => {
    const date = new Date();
    e.preventDefault();
    const newQuiz = {
      ...state.myQuiz,
      userId: parsedUserId,
    };
    addQuiz(newQuiz).then((response) => {
      quizDone();
      console.log(response);
      setTimeout(() => (window.location.href = "/MyQuizzes"), 3000);
    });

    // Further processing can be added here
  };

  return (
    <div className="flex flex-col justify-center baloo ">
      <Notification myNotify={myNotify} />
      <form onSubmit={handleSubmit}>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
          setNotification={setNotification}
        />
        <Main
          myQuiz={myQuiz}
          myQuestion={myQuestion}
          setModalVisible={() => setModalVisible(true)}
          buttonDisabled={buttonDisabled}
        />
      </form>
    </div>
  );
};

export default CreateQuiz;
