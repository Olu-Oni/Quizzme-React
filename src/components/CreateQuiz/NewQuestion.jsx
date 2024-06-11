import { useState } from "react";

const NewOption = ({ option, deleteOption, myOption, questionName }) => {
  const { num, question, content } = option;
  const { optionCount, setOptionCount } = myOption;
  const handlechange = (e) => {
    const newOption = { ...option, content: e.target.value };
    setOptionCount(
      optionCount.map((o) => (o.num === option.num ? newOption : o))
    );
  };
  return (
    <label htmlFor={`Option${num}`} className="multiOption">
      <input
        type="text"
        id={`Option${num}`}
        name={`Q${question}`}
        value={content}
        onChange={handlechange}
        required
        placeholder={`Option ${num}`}
        className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button onClick={() => deleteOption(num)} className="ml-3">
        delete
      </button>
    </label>
  );
};

const NewQuestion = ({questionCount}) => {
  const questionName = `Question${questionCount}`
  const [optionCount, setOptionCount] = useState([]);
  const myOption = { optionCount, setOptionCount };
  const deleteOption = (num) => {
    const newCount = optionCount.filter((option) => option.num != num);
    setOptionCount(newCount.map((count, i) => ({ ...count, num: i + 1 })));
  };

  const addOption = () => {
    const newOption = {
      num: optionCount.length + 1,
      question: questionName,
      content: "",
    };
    setOptionCount([...optionCount.concat(newOption)]);
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl mt-5 p-2 w-full min-h-[150px] shadow-lg">
      <div className="flex max-sm:flex-col">
        <textarea
          type="text"
          name= {questionName}
          required
          placeholder="Question..."
          className="bg-slate-200 min-w-48 w-[80%] m-3 p-2 pb-0 bg-opacity-35 border-b border-black outline-none text-xl placeholder:text-gray-500"
        />
        <select name="questionType" className="max-w-32 m-3">
          <option value="multiChoice">MultiChoice</option>
          <option value="text">Text</option>
          <option value="multiChoice">MultiChoice</option>
        </select>
      </div>
      <div className="flex flex-col">
        {optionCount
          ? optionCount.map((option) => (
              <NewOption
                key={option.num}
                option={option}
                deleteOption={deleteOption}
                myOption={myOption}
                questionName={questionName}
              />
            ))
          : null}

        <a
          id="addOption"
          onClick={addOption}
          className="multiOption text-gray-500 pb-0 hover:text-black"
        >
          Add new option...
        </a>
      </div>
    </div>
  );
};

export default NewQuestion;
