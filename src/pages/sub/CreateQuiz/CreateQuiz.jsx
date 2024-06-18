import { useState, useEffect } from "react";
import NewQuestion from "./NewQuestion";
import Header from "../../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MyButton } from "../../../components/MyButtons";
import { addOption, addQuestion, addQuiz } from "../../../services/quiz";
import MyModal from "../../../components/Modal";
import dayjs from "dayjs";
import MyNotification from "../../../components/MyNotifications";

// Time component
const Time = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      name="time"
      defaultValue={dayjs().hour(0).minute(15)}
      ampm={false}
      openTo="hours"
      views={["hours", "minutes"]}
      label="Select Time (hh:mm)"
      format="HH:mm"
      sx={{
        minWidth: "110px",
        maxWidth: "200px",
        margin: "14px",
        marginTop: "5px",
      }}
    />
  </LocalizationProvider>
);

//Modal Component
const Modal = ({ modalVisible, setModalVisible}) => {
  
  return (
    <MyModal modalVisible={modalVisible}>
      <div className="flex flex-col justify-around relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl px-8">
        <h1 className="text-center">
          Are you sure you want to Submit this quiz?
        </h1>
        <div className="flex justify-center gap-4 md:gap-20">
          <button
            onClick={setModalVisible}
            className={`text-slate-400 hover:text-black hover:outline-2 outline-slate-300`}
          >
            Continue Editing
          </button>
          <button
            type="submit"
            className={`text-slate-400 hover:text-black hover:outline-2 outline-slate-300`}
          >
            Create my Quizz
          </button>
        </div>
      </div>
    </MyModal>
  );
};

// Main component
const Main = ({ myOption, myQuestion, setModalVisible }) => {
  const { questionCount, setQuestionCount } = myQuestion;
  const { optionCount } = myOption;

  //check if all inputs are filled
  const [quizTitle, setTitle] = useState("");
  const [quizValid, setQuizValid] = useState(false);
  useEffect(() => {
    const titleValid = quizTitle.split(" ").join("") !== "";
    const questionsValid = questionCount.every(
      (question) => question.content.split(" ").join("") !== ""
    );
    const optionsValid = optionCount.every(
      (option) => option.content.split(" ").join("") !== ""
    );

    setQuizValid(titleValid && questionsValid && optionsValid);
  }, [questionCount, optionCount]);
  console.log(quizValid);
  //new Questions
  const QuNum = questionCount.length + 1;
  const addQuestion = () => {
    const newQuestion = {
      id: `Q${QuNum}`,
      QuizID: `Quiz1`,
      content: "",
      type: "multiChoice",
      options:[]
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
      <h1 className="text-green-900">Create your own custom Quiz</h1>
      <div className="flex flex-col bg-white rounded-t-3xl mt-5 w-full min-h-[200px] shadow-lg p-4">
        <div className="flex max-sm:flex-col justify-between">
          <input
            type="text"
            name="title"
            required
            placeholder="Quiz Title*"
            value={quizTitle}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:bg-slate-200 min-w-48 w-[50%] m-3 p-2 pb-0 bg-opacity-35 focus:border-b border-black outline-none text-3xl placeholder:text-gray-500"
          />
          <Time />
        </div>
        <textarea
          name="desc"
          placeholder="Quiz Description"
          className="bg-slate-100 max-h-[50%] m-3 p-2 pb-0 bg-opacity-35 border-b border-black outline-none text-lg resize-none"
        />
      </div>
      {questionCount.map((question) => (
        <NewQuestion
          key={question.id}
          question={question}
          myOption={myOption}
          myQuestion={myQuestion}
          deleteQuestion={deleteQuestion}
        />
      ))}
      <a
        onClick={addQuestion}
        className="flex bg-white transition-none rounded-3xl mt-5 p-2 w-full min-h-[50px] text-gray-500 hover:text-black hover:outline outline-gray-300 cursor-pointer"
      >
        <p id="addOption" className="addQuestion m-auto pb-0">
          New Question
        </p>
      </a>
      {questionCount.length > 0 ? (
        <button
          type="button"
          onClick={setModalVisible}
          disabled={!quizValid}
          className={`flex bg-green-300 rounded-3xl mt-5 p-2 w-[90%] min-h-[50px] shadow-lg  ${
            quizValid
              ? `hover:text-black hover:bg-green-400 hover:scale-105 cursor-pointer`
              : ""
          }`}
        >
          <p id="addOption" className=" m-auto pb-0 text-xl">
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
      <h2 className="my-4 mx-auto text-xl text-green-700">{notification}</h2>
    </MyNotification>
  );
};

// CreateQuiz component
const CreateQuiz = ({ dropDown }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [questionCount, setQuestionCount] = useState([]);
  const [optionCount, setOptionCount] = useState([]);
  
  const myOption = { optionCount, setOptionCount };
  const myQuestion = { questionCount, setQuestionCount };
  const myNotify = { notification, setNotification };
  
  const quizDone = () => {
    setModalVisible();
    setNotification("Quiz submitted!!!");
  };

  const date = new Date();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const myQuiz = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      time: formData.get("time"),
      createdAt: date.toLocaleString("GMT"),
      // questions:
    };
    addQuiz(myQuiz).then((response) => console.log(response));

    // Further processing can be added here
  };


  return (
    <div className="baloo flex flex-col justify-center ">
      <Notification myNotify={myNotify} />
      <Header dropDown={dropDown} />
      <form onSubmit={handleSubmit}>
        <Modal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(false)}
          setNotification={setNotification}
        />
        <Main
          myOption={myOption}
          myQuestion={myQuestion}
          handleSubmit={handleSubmit}
          setModalVisible={() => setModalVisible(true)}
        />
      </form>
    </div>
  );
};

export default CreateQuiz;
