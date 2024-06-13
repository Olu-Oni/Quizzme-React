const MultiOption = ({ option, deleteOption, myOption, number }) => {
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

  const CheckOption = ({ option, deleteOption, myOption, number }) => {
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

  const TextOption = ({ option, myOption, addOption }) => {
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
    console.log('text')
    addOption()
    return (
      <label htmlFor={optionName} className="multiOption">
        <input
          type="text"
          id={optionName}
          name={optionName}
          value={content}
          onChange={handleOptionChange}
          required
          placeholder={`Answer1, Answer2, Answer3,...`}
          className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
        />
      </label>
    );
  };
  
export {MultiOption, CheckOption,TextOption} 