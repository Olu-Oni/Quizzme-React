import { Trash } from "../../../components/inputs/Icons";
import { MultiOption, CheckOption, TextOption } from "./Options";

const Option = ({
  type,
  optionCount,
  question,
  deleteOption,
  myOption,
  addOption,
}) => {
  switch (type) {
    case "multiChoice":
      return (
        <div className="flex flex-col">
          {optionCount
            .filter((opt) => opt.QuID === question.id)
            .map((opt, i) => (
              <MultiOption
                key={opt.num}
                option={opt}
                number={i + 1}
                deleteOption={deleteOption}
                myOption={myOption}
              />
            ))}

          <a
            id="addOption"
            onClick={addOption}
            className={`multiOption text-gray-500 pb-0 hover:text-black`}
          >
            Add new option...
          </a>
        </div>
      );
    case "checkBox":
      return (
        <div className="flex flex-col">
          {optionCount
            .filter((opt) => opt.QuID === question.id)
            .map((opt, i) => (
              <CheckOption
                key={opt.num}
                option={opt}
                number={i + 1}
                deleteOption={deleteOption}
                myOption={myOption}
              />
            ))}

          <a
            id="addOption"
            onClick={addOption}
            className={`multiOption text-gray-500 pb-0 hover:text-black ${
              question.type === "text" ? "hidden" : "block"
            }`}
          >
            Add new option...
          </a>
        </div>
      );
    case "text":
      return optionCount.find((opt) => opt.QuID === question.id) ? (
        <TextOption
          key={question.id}
          option={optionCount.find((opt) => opt.QuID === question.id)}
          addOption={addOption}
          myOption={myOption}
        />
      ) : null;
    default:
      return null;
  }
};

const NewQuestion = ({ myOption, question, myQuestion, deleteQuestion }) => {
  const { optionCount, setOptionCount } = myOption;
  const { questionCount, setQuestionCount } = myQuestion;

  const deleteOption = (num) => {
    const newCount = optionCount.filter((opt) => opt.num !== num);
    setOptionCount(newCount.map((count, i) => ({ ...count, num: i + 1 })));
  };

  const addOption = () => {
    const newOption = {
      num: optionCount.length + 1,
      QuID: question.id,
      content: "",
      isCorrect: false,
    };
    setOptionCount([...optionCount, newOption]);
  };
  const handleQuestionChange = (e, value) => {
    const newQuestion = { ...question, [value]: e.target.value };
    if (value === "type") {
      //resetting the options on type change
      setOptionCount([...optionCount.filter((o) => o.QuID != question.id)]);
      if (newQuestion.type === "text") {
        // automatically adding one option for type 'text' change
        addOption();
      }
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
        optionCount={optionCount}
        question={question}
        deleteOption={deleteOption}
        addOption={addOption}
        myOption={myOption}
      />
      <button onClick={()=>deleteQuestion(question.id)} className="mt-4 opacity-60 hover:opacity-100">
        remove Question
        <Trash/>
      </button>
    </div>
  );
};

export default NewQuestion;
