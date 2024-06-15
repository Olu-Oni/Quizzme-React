import checkMark from "../../../../images/checkMark.svg";
import { Remove } from "../../../components/inputs/Icons";

const MultiOption = ({ option, deleteOption, myOption, number }) => {
  const { num, QuID, content, isCorrect } = option;
  const { optionCount, setOptionCount } = myOption;
  const handleOptionChange = (e, value) => {
    const newOption = {
      ...option,
      [value]: value === "isCorrect" ? !isCorrect : e.target.value,
    };
    if (value === "isCorrect") {
      setOptionCount(
        optionCount.map((o) => {
          if (o.QuID === option.QuID) {
            if (o.num === option.num) {
              return newOption;
            }
            {return { ...o, isCorrect: false };}
          }
          return o
        })
      );
    } else {
      setOptionCount(
        optionCount.map((o) =>
          o.QuID === option.QuID && o.num === option.num ? newOption : o
        )
      );
    }
  };
  //option name
  const optionName = `${QuID}Op${num}`;
  //
  return (
    <div className="m-3 ">
      <label htmlFor={`${num}correct`} className="m-2 ml-0 ">
        <span
          className={`inline-block relative top-2 w-5 h-5 rounded-full border border-green-950 ${
            isCorrect ? "bg-green-500 border-neutral-500" : ''
          } `}
        >
         {isCorrect ? <img
            className={`check rotate-[-10deg] mt-[5px] ml-[1.5px]`}
            src={checkMark}
          />:null}
        </span>
      </label>
      <input
        type="text"
        id={optionName}
        name={optionName}
        value={content}
        onChange={(e) => handleOptionChange(e, "content")}
        required
        placeholder={`Option ${number}`}
        className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button onClick={() => deleteOption(num)} className="tooltip ml-3 opacity-60 hover:opacity-100">
        <div className="tooltiptext">remove</div>
        <Remove />
      </button>
      <button
        onClick={(e) => handleOptionChange(e, "isCorrect")}
        className={`ml-3 relative top-1 ${isCorrect ? "text-green-500" : "text-gray-400"}`}
      >
        Correct
      </button>
    </div>
  );
};

const CheckOption = ({ option, deleteOption, myOption, number }) => {
  const { num, QuID, content, isCorrect } = option;
  const { optionCount, setOptionCount } = myOption;
  const handleOptionChange = (e, value) => {
    const newOption = {
      ...option,
      [value]: value === "isCorrect" ? !isCorrect : e.target.value,
    };
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
    <div className="m-3">
      <label htmlFor={`${num}correct`} className="m-2 ml-0 ">
        <span
          className={`inline-block relative top-2 w-5 h-5 rounded-full border border-green-950 ${
            isCorrect ? "bg-green-500 border-neutral-500" : ''
          } `}
        >
          {isCorrect ? <img
            className={`check rotate-[-10deg] mt-[5px] ml-[1.5px]`}
            src={checkMark}
          />:null}
        </span>
      </label>
      <input
        type="text"
        id={optionName}
        name={optionName}
        value={content}
        onChange={(e) => handleOptionChange(e, "content")}
        required
        placeholder={`Option ${number}`}
        className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
      />
      <button onClick={() => deleteOption(num)} className="tooltip ml-3 opacity-60 hover:opacity-100">
        <div className="tooltiptext">remove</div>
        <Remove />
      </button>
      <button
        onClick={(e) => handleOptionChange(e, "isCorrect")}
        className={`ml-3 ${isCorrect ? "text-green-500" : "text-gray-400"}`}
      >
        Correct
      </button>
    </div>
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
  console.log("text");
  return (
    <label htmlFor={optionName} className="multiOption">
      <input
        type="text"
        id={optionName}
        name={optionName}
        value={content}
        onChange={(e) => handleOptionChange(e, "content")}
        required
        placeholder={`Answer1, Answer2, Answer3,...`}
        className=" min-w-48 w-[50%]   pt-1 bg-opacity-35 border-b border-black outline-none"
      />
    </label>
  );
};

export { MultiOption, CheckOption, TextOption };
