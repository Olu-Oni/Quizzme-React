import { useState } from "react";
import NewQuestion from "./NewQuestion";
import Header from "../../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MyButton } from "../../../components/MyButtons";
import { addOption, addQuestion, addQuiz } from "../../../services/quiz";

// Time component
const Time = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      name="time"
      ampm={false}
      openTo="hours"
      views={["hours", "minutes"]}
      label="Select Time"
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

// Main component
const Main = ({ myOption, myQuestion, handleSubmit }) => {
  const { questionCount, setQuestionCount } = myQuestion;

  const QuNum = questionCount.length + 1;
  const addQuestion = () => {
    const newQuestion = {
      id: `Q${QuNum}`,
      QuizID: `Quiz1`,
      content: "",
      type: "multiChoice",
     };
    setQuestionCount([...questionCount.concat(newQuestion)]);
  };
  const deleteQuestion = (id) => {
    const newQuestions = questionCount.filter((q) => q.id !== id);
    setQuestionCount(newQuestions);
  };
  return (
    <main className="flex flex-col items-center lg:mx-36 mb-5">
      <h1 className="text-green-900">Create your own custom Quiz</h1>
      <div className="flex flex-col bg-white rounded-t-3xl mt-5 w-full min-h-[200px] shadow-lg p-4">
        <div className="flex max-sm:flex-col justify-between">
          <input
            type="text"
            name="title"
            required
            placeholder="Quiz Title*"
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
      </a>{
        questionCount.length>0?
      <button
        type="submit"
        className="flex bg-green-300 hover:bg-green-400 rounded-3xl mt-5 p-2 w-[90%] min-h-[50px]  hover:text-black hover:scale-105 shadow-lg cursor-pointer"
      >
        <p id="addOption" className=" m-auto pb-0 text-xl">
          Create my Quizz
        </p>
      </button>:null}
      </main>
  );
};

// CreateQuiz component
const CreateQuiz = ({ dropDown }) => {
  const [questionCount, setQuestionCount] = useState([]);
  const [optionCount, setOptionCount] = useState([]);
  const myOption = { optionCount, setOptionCount };
  const myQuestion = { questionCount, setQuestionCount };

  const date = new Date();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const myQuiz = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      time: formData.get("time"),
      id: "Quiz2",
      // questionAmount: 0,
      createdAt: date.toLocaleString("GMT"),
    };
    addQuiz(myQuiz).then((response) => console.log(response));

    const question = [];
    // Further processing can be added here
  };

  return (
    <div className="baloo flex flex-col justify-center px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <Header dropDown={dropDown} />
      <form onSubmit={handleSubmit}>
        
        <Main myOption={myOption} myQuestion={myQuestion} handleSubmit={handleSubmit}/>
      </form>
    </div>
  );
};

export default CreateQuiz;
