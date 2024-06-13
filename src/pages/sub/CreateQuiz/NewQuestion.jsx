const NewOption = ({ option, deleteOption, myOption, number }) => {
  const { num, QuID, content } = option;
  const { optionCount, setOptionCount } = myOption;
  const handleOptionChange = (e) => {
    const newOption = { ...option, content: e.target.value };
    setOptionCount(
      optionCount.map((o) =>
        o.QuID === option.QuID && o.num === option.num ? newOption : o
      )
    );
  };
  //option name
  const optionName = `${QuID}Op${num}`;
  //
  return (
    <label htmlFor={optionName} className="multiOption">
      <input
        type="text"
        id={optionName}
        name={optionName}
        value={content}
        onChange={handleOptionChange}
        required
        placeholder={`Option ${number}`}
        className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button onClick={() => deleteOption(num)} className="ml-3">
        delete
      </button>
    </label>
  );
};

// optionCount:optionCount.fiter(option=>option.QuID===question.id)

const NewQuestion = ({ myOption, question,myQuestion }) => {
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
    setOptionCount([...optionCount.concat(newOption)]);
  };

  const handleQuestionChange = (e,value) => {
    const newQuestion= { ...question, [value]: e.target.value };
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
          className="max-w-32 m-3"
        >
          <option value="multiChoice">MultiChoice</option>
          <option value="text">Text</option>
          <option value="multiChoice">MultiChoice</option>
        </select>
      </div>
      <div className="flex flex-col">
        {optionCount
          ? optionCount
              .filter((option) => option.QuID === question.id)
              .map((option, i) => (
                <NewOption
                  key={option.num}
                  option={option}
                  number={i + 1}
                  deleteOption={deleteOption}
                  myOption={myOption}
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
