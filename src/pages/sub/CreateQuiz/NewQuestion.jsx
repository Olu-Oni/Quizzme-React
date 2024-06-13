import { MultiOption, CheckOption, TextOption } from "./Options";

const Option = ({ type, option, deleteOption, myOption, number,addOption }) => {
  console.log(type)
  switch (type) {
    case "multiChoice":
      return (
        <MultiOption
          key={option.num}
          option={option}
          number={number}
          deleteOption={deleteOption}
          myOption={myOption}
        />
      );
    case "checkBox":
      console.log('check')
      return (
        <CheckOption
          key={option.num}
          option={option}
          number={number}
          deleteOption={deleteOption}
          myOption={myOption}
        />
      );
    case "text":
      console.log('text')
      return (
        <TextOption
          key={option.num}
          option={option}
          addOption={addOption}
          myOption={myOption}
        />
      );
  }
};

const NewQuestion = ({ myOption, question, myQuestion }) => {
  const { optionCount, setOptionCount } = myOption;
  const { questionCount, setQuestionCount } = myQuestion;

  const deleteOption = (num) => {
    const newCount = optionCount.filter((option) => option.num != num);
    setOptionCount(newCount.map((count, i) => ({ ...count, num: i + 1 })));
  };

  const addOption = () => {
    const newOption = {
      num: optionCount.length + 1,
      QuID: question.id,
      content: "",
    };
    console.log('added')
    setOptionCount([...optionCount.concat(newOption)]);
  };
  const handleQuestionChange = (e, value) => {
    const newQuestion = { ...question, [value]: e.target.value };
    if (value === "type") {
      console.log("type changed",question.type);
      // if needed, add code to reset options upon change of type
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
      <div className="flex flex-col">
        {optionCount
          .filter((option) => option.QuID === question.id)
          .map((option, i) => (
            <Option
              type={question.type}
              key={option.num}
              option={option}
              number={i + 1}
              deleteOption={deleteOption}
              addOption={addOption}
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
    </div>
  );
};

export default NewQuestion;
