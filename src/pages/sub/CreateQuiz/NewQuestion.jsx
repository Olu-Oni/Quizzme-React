import { useEffect } from "react";
import { Trash } from "../../../components/inputs/Icons";
import { MultiOption, CheckOption, TextOption } from "./Options";

const Option = ({ type, options, question, deleteOption, updateOption }) => {
  switch (type) {
    case "multiChoice":
      return (
        <div className="flex flex-col">
          {options.map((opt, i) => (
            <MultiOption
              key={opt.num}
              option={opt}
              number={i + 1}
              deleteOption={deleteOption}
              updateOption={updateOption}
            />
          ))}

          <a
            id="addOption"
            onClick={() => updateOption(null)}
            className={`multiOption text-gray-500 pb-0 hover:text-black`}
          >
            Add new option...
          </a>
        </div>
      );
    case "checkBox":
      return (
        <div className="flex flex-col">
          {options.map((opt, i) => (
            <CheckOption
              key={opt.num}
              option={opt}
              number={i + 1}
              deleteOption={deleteOption}
              updateOption={updateOption}
            />
          ))}

          <a
            id="addOption"
            onClick={() => updateOption(null)}
            className={`multiOption text-gray-500 pb-0 hover:text-black ${
              question.type === "text" ? "hidden" : "block"
            }`}
          >
            Add new option...
          </a>
        </div>
      );
    case "text":
      return options.length ? (
        <TextOption
          key={question.id}
          option={options[0]}
          updateOption={updateOption}
        />
      ) : null;
    default:
      return null;
  }
};

const NewQuestion = ({ question, myQuestion, deleteQuestion }) => {
  const { questionCount, setQuestionCount } = myQuestion;

  const deleteOption = (num) => {
    const newQuestions = questionCount.map((q) =>
      q.id === question.id
        ? {
            ...q,
            options: q.options
              .filter((opt) => opt.num !== num)
              .map((opt, i) => ({ ...opt, num: i + 1 })),
          }
        : q
    );
    setQuestionCount(newQuestions);
  };

  const updateOption = (updatedOption) => {
    const newQuestions = questionCount.map((q) => {
      if (q.id === question.id) {
        let newOptions = updatedOption
          ? q.options.map((opt) => {
              if (opt.num === updatedOption.num) {
                return updatedOption;
              } else if (q.type === "multiChoice" && updatedOption.isCorrect) {
                return { ...opt, isCorrect: false };
              }
              return opt;
            })
          : [
              ...q.options,
              {
                num: q.options.length + 1,
                content: "",
                isCorrect: false,
              },
            ];
        const newQuestion = { ...q, options: newOptions };
        //  check for any correct options available in each questions which
        const correctOpt = newQuestion.options
          .filter((opt) => opt.isCorrect === true)
          .map((opt) => opt.num.toString()); //remove the toString if necessary
        return { ...newQuestion, correctOption: correctOpt };
      }
      return q;
    });
    setQuestionCount(newQuestions);
  };

  const handleQuestionChange = (e, value) => {
    const newQuestion = { ...question, [value]: e.target.value };
    if (value === "type") {
      newQuestion.options =
        newQuestion.type === "text"
          ? [{ num: 1, content: "", isCorrect: true }]
          : [];
    }
    setQuestionCount(
      questionCount.map((q) => (q.id === question.id ? newQuestion : q))
    );
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl mt-5 p-2 w-full min-h-[150px] shadow-lg">
      <div className="flex max-sm:flex-col">
        <textarea
          type="text"
          name={question.id}
          required
          autoFocus
          placeholder="Question..."
          value={question.content}
          onChange={(e) => handleQuestionChange(e, "content")}
          className="bg-slate-200 min-w-48 w-[80%] m-3 p-2 pb-0 bg-opacity-35 border-b border-black outline-none text-xl placeholder:text-gray-500"
        />
        <select
          name={`${question.id}Type`}
          value={question.type}
          onChange={(e) => handleQuestionChange(e, "type")}
          className="max-w-32 m-3 outline-none hover:bg-slate-200"
        >
          <option value="multiChoice">MultiChoice</option>
          <option value="checkBox">Check Box</option>
          <option value="text">Text</option>
        </select>
      </div>
      <Option
        type={question.type}
        options={question.options}
        question={question}
        deleteOption={deleteOption}
        updateOption={updateOption}
      />
      <button
        type="button"
        onClick={() => deleteQuestion(question.id)}
        className="mt-4 opacity-60 hover:opacity-100"
      >
        remove Question
        <Trash />
      </button>
    </div>
  );
};

export default NewQuestion;
