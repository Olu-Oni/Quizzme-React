import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import dayjs from "dayjs";
import MyModal from "../../../components/Modal";

// Time component
export const Time = ({ myQuiz }) => {
  const { quiz, setters } = myQuiz;
  const initialTime = quiz.time ? dayjs(quiz.time, "HH:mm") : null;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        name="time" //   defaultValue={dayjs().hour(0).minute(15)}
        value={initialTime}
        onChange={(newVal) => setters.setQuizTime(newVal)}
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
};

//Modal Component
export const Modal = ({ modalVisible, setModalVisible, updateQuiz }) => {
  return (
    <MyModal modalVisible={modalVisible}>
      <div className="flex flex-col justify-around relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl px-8">
        <h1 className="text-center">
          Are you sure you want to Submit this quiz?
        </h1>
        <div className="flex justify-center gap-4 sm:gap-20">
          <button
            type="button"
            onClick={setModalVisible}
            className={`text-slate-400 rounded-2xl hover:text-black  hover:outline  outline-slate-300`}
          >
            Continue Editing
          </button>{
            updateQuiz?
          <button
            type="button"
            onClick={updateQuiz}
            className={`text-slate-400 rounded-2xl hover:text-black hover:outline outline-slate-300`}
          >
            Submit my Quizz
          </button>:
          <button
          type="submit"
          className={`text-slate-400 hover:text-black hover:outline-2 outline-slate-300`}
        >
          Create my Quizz
        </button>}
        </div>
      </div>
    </MyModal>
  );
};

