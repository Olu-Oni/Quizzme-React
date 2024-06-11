import { useState } from "react";
import NewQuestion from "../../../components/CreateQuiz/NewQuestion";
import Header from "../../../components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const Time = ({ selectedTime, handleTimeChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        name="time"
        ampm={false} // Set ampm to false to remove AM/PM selection
        openTo="hours" // Set the initial view to minutes
        views={["hours", "minutes"]} // Restrict the selection to minutes and seconds
        label="Select Time"
        format="hh:mm"
        sx={{
          minWidth: "110px",
          maxWidth: "200px",
          margin: "14px",
          marginTop: "5px",
        }}
      />
    </LocalizationProvider>
  );
};

const Main = () => {
  const [questionCount, setQuestionCount] = useState([1]);

  const addOQuestion = () => {
    setQuestionCount([...questionCount.concat(questionCount.length + 1)]);
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
          className="bg-slate-100 max-h-[50%] s m-3 p-2 pb-0 bg-opacity-35 border-b border-black outline-none text-lg resize-none"
        />
      </div>
      {questionCount.map((count) => (
        <NewQuestion questionCount={count} />
      ))}
      <div className="flex  bg-white rounded-3xl mt-5 p-2 w-full min-h-[50px] shadow-lg">
        <a
          id="addOption"
          onClick={addOQuestion}
          className="addQuestion text-gray-500 m-auto pb-0 hover:text-black hover:scale-105"
        >
          New Question
        </a>
      </div>
    </main>
  );
};
const CreateQuiz = ({ dropDown }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.time.value);
    const myQuiz = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      time: e.target.time.value,
      questionAmount: 0,
      createdAt: "",
    };
  };
  return (
    <div className="baloo flex flex-col justify-center px-4 sm:px-10 md:px-14 lg:px-[10%]">
      <Header dropDown={dropDown} />
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="fixed z-30 bottom-3 right-4 text-2xl bg-green-400 py-2 px-5 rounded-3xl"
        >
          Create
        </button>

        <Main />
      </form>
    </div>
  );
};

export default CreateQuiz;
