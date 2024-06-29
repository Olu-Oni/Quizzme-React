import { useContext } from "react";
import { MyStates } from "../../../App";

const CheckMark = () => {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="check rotate-[-10deg] mt-1 ml-[1.5px] hidden"
    >
      <path
        d="M4.81337 6.83844L13.0806 1.18286C13.3375 1.00712 13.6433 0.937658 13.9979 0.974467C14.3526 1.01128 14.631 1.14137 14.8331 1.36474C15.0352 1.58812 15.1151 1.854 15.0728 2.16241C15.0304 2.47081 14.8808 2.71289 14.6239 2.88863L5.37588 9.21521C5.09564 9.40692 4.78861 9.48546 4.45479 9.45081C4.12097 9.41617 3.84383 9.277 3.62335 9.03332L0.757096 5.86548C0.554988 5.6421 0.475102 5.37621 0.517434 5.06781C0.559767 4.7594 0.709378 4.51733 0.966268 4.34159C1.22316 4.16585 1.52894 4.09639 1.88362 4.1332C2.2383 4.17001 2.5167 4.3001 2.71881 4.52347L4.81337 6.83844Z"
        fill="white"
      />
    </svg>
  );
};

const Choice = ({ name, value, chosenAnswers, type, handleAnswer }) => {
  if (type === "text") {
    return (
      <label
        htmlFor={name}
        className="myChoiceLabel flex justify-between relative bg-white p-4 px-6 w-[95%] text-left text-base md:text-lg rounded-xl shadow-md"
      >
        <input
          className="w-full pt-3 pl-2 bg-slate-300 bg-opacity-35 border-b rounded-b-sm border-black outline-none"
          id={name}
          type="text"
          name={name}
          value={chosenAnswers}
          onChange={(e) => handleAnswer(e, e.target.value)}
          placeholder="Enter your answer"
        />
      </label>
    );
  }
  const isChecked = chosenAnswers.includes(value);

  return (
    <label
      htmlFor={value}
      className="myChoiceLabel flex justify-between relative bg-white p-[9px] pt-[14px] pl-14 pr-6 w-[95%] text-left text-base md:text-lg rounded-2xl shadow-md"
    >
      <input
        className="myChoice hidden"
        id={value}
        type={type}
        name={name}
        checked={isChecked}
        onChange={() => handleAnswer(null, value)}
      />
      {value}
      <span
        className={`inline-block absolute left-5 w-5 h-5 ${
          type === "radio" ? "rounded-full" : ""
        } border border-green-950 `}
      >
        <CheckMark />
      </span>
    </label>
  );
};

const MultiChoice = ({ chosenAnswers, handleAnswer, question, options }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 m-auto w-[70%] md:w-full min-w-[250px] max-w-[400px] py-1">
      {options.map((option) => (
        <Choice
          key={option.num}
          name={`${question.id}`}
          value={option.content}
          type="radio"
          chosenAnswers={chosenAnswers}
          handleAnswer={handleAnswer}
        />
      ))}
    </div>
  );
};

const CheckBoxChoice = ({ handleAnswer, chosenAnswers, question, options }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 m-auto w-[70%] md:w-full min-w-[250px] max-w-[400px] py-1">
      {options.map((option) => (
        <Choice
          key={option.num}
          name={`${question.id}`}
          value={option.content}
          chosenAnswers={chosenAnswers}
          handleAnswer={handleAnswer}
          type="checkBox"
        />
      ))}
    </div>
  );
};

const TextChoice = ({ chosenAnswers, question, options, handleAnswer }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 m-auto w-[70%] md:w-full min-w-[250px] max-w-[400px] py-1">
      {options.map((option) => (
        <Choice
          key={option.num}
          name={`${question.id}`}
          value={option.content}
          type="text"
          chosenAnswers={chosenAnswers}
          handleAnswer={handleAnswer}
        />
      ))}
    </div>
  );
};

const MyChoice = ({ question, options = question.options }) => {
  const {
    state: { performance },
    setters: { setPerformance },
  } = useContext(MyStates);

  const handleAnswer = (e, value) => {
    let answers  

    if (question.type === "multiChoice") {
      // Update the answers state with chosen and correct answers
    answers = performance.answers.map((ans) =>
      ans.id === question.id
        ? { ...ans, chosenAnswers: [value] }
        : ans
    );
    } else if (question.type === "checkBox") {
      // Update the answers state with chosen and correct answers
    answers = performance.answers.map((answers) => {
        if (answers.id === question.id) {
          if (answers.chosenAnswers.includes(value)) {
            answers.chosenAnswers.splice(answers.chosenAnswers.indexOf(value), 1);
            return answers;
          }
          return {
            ...answers,
            chosenAnswers: answers.chosenAnswers.find((c) => c === value)
              ? answers.chosenAnswers
              : answers.chosenAnswers.concat(value),
          };
        }
        return answers;
      });
    } else if (question.type === "text") {
      answers = performance.answers.map((answers) =>
        answers.id === question.id
          ? { ...answers, chosenAnswers: [e.target.value] }
          : answers
      );
    }

    setPerformance({
      ...performance,
      answers: answers,
    });
  };

   const chosenAnswers = performance.answers
    ? performance.answers.find((answers) => answers.id === question.id)
        .chosenAnswers
    : [];

  switch (question.type) {
    case "multiChoice":
      return (
        <MultiChoice
          question={question}
          options={options}
          chosenAnswers={chosenAnswers}
          handleAnswer={handleAnswer}
        />
      );
    case "checkBox":
      return (
        <CheckBoxChoice
          question={question}
          options={options}
          chosenAnswers={chosenAnswers}
          handleAnswer={handleAnswer}
        />
      );
    case "text":
      return (
        <TextChoice
          question={question}
          options={options}
          handleAnswer={handleAnswer}
          chosenAnswers={chosenAnswers}
        />
      );
  }
};

export default MyChoice;
