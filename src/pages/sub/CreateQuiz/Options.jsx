import checkMark from "../../../../images/checkMark.svg";
import { Remove } from "../../../components/inputs/Icons";

const MultiOption = ({ option, deleteOption, updateOption, number }) => {
  const { num, content, isCorrect } = option;

  const handleOptionChange = (e, value) => {
    const newOption = {
      ...option,
      [value]: value === "isCorrect" ? !isCorrect : e.target.value,
    };
    updateOption(newOption);
  };

  const optionName = `Op${num}`;

  return (
    <div className="m-3">
      <div className="m-2 ml-0 inline">
        <span
          className={`inline-block relative top-2 w-5 h-5 rounded-full border border-green-950 ${
            isCorrect ? "bg-green-500 border-neutral-500" : ""
          }`}
        >
          {isCorrect ? (
            <img
              className={`check rotate-[-10deg] mt-[5px] ml-[1.5px]`}
              src={checkMark}
            />
          ) : null}
        </span>
      </div>
      <input
        type="text"
        name={optionName}
        value={content}
        autoFocus
        onChange={(e) => handleOptionChange(e, "content")}
        required
        placeholder={`Option ${number}`}
        className="min-w-48 w-[50%] pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button type="button" onClick={() => deleteOption(num)} className="tooltip ml-3 opacity-60 hover:opacity-100">
        <div className="tooltiptext">remove</div>
        <Remove />
      </button>
      <button
        type="button"
        onClick={(e) => handleOptionChange(e, "isCorrect")}
        className={`ml-3 relative top-1 ${isCorrect ? "text-green-500" : "text-gray-400"}`}
      >
        Correct
      </button>
    </div>
  );
};

const CheckOption = ({ option, deleteOption, updateOption, number }) => {
  const { num, content, isCorrect } = option;

  const handleOptionChange = (e, value) => {
    const newOption = {
      ...option,
      [value]: value === "isCorrect" ? !isCorrect : e.target.value,
    };
    updateOption(newOption);
  };

  const optionName = `Op${num}`;

  return (
    <div className="m-3">
      <div className="m-2 ml-0 inline">
        <span
          className={`inline-block relative top-2 w-5 h-5 rounded-full border border-green-950 ${
            isCorrect ? "bg-green-500 border-neutral-500" : ""
          }`}
        >
          {isCorrect ? (
            <img
              className={`check rotate-[-10deg] mt-[5px] ml-[1.5px]`}
              src={checkMark}
            />
          ) : null}
        </span>
      </div>
      <input
        type="text"
        name={optionName}
        value={content}
        autoFocus
        onChange={(e) => handleOptionChange(e, "content")}
        required
        placeholder={`Option ${number}`}
        className="min-w-48 w-[50%] pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button type="button" onClick={() => deleteOption(num)} className="tooltip ml-3 opacity-60 hover:opacity-100">
        <div className="tooltiptext">remove</div>
        <Remove />
      </button>
      <button
        type="button"
        onClick={(e) => handleOptionChange(e, "isCorrect")}
        className={`ml-3 ${isCorrect ? "text-green-500" : "text-gray-400"}`}
      >
        Correct
      </button>
    </div>
  );
};

const TextOption = ({ option, updateOption }) => {
  const { num, content } = option;

  const handleOptionChange = (e) => {
    const newOption = { ...option, content: e.target.value };
    updateOption(newOption);
  };

  const optionName = `Op${num}`;

  return (
    <div>
      <label htmlFor={optionName} className="multiOption">
        </label>
        <input
          type="text"
          id={optionName}
          name={'textAnswer'}
          value={content}
          autoFocus
          onChange={(e) => handleOptionChange(e, "content")}
          required
          placeholder={`Answer1, Answer2, Answer3,...`}
          className="min-w-48 w-[50%] pt-1 bg-opacity-35 border-b border-black outline-none"
        />
    </div>
  );
};

export { MultiOption, CheckOption, TextOption };
