import checkMark from '../../../../images/checkMark.svg'
const Choice = ({ name, value }) => {
  return (
    <label htmlFor={value} className="myChoiceLabel flex justify-between relative bg-white p-[9px] pt-[14px] pl-12 md:pl-10 pr-8 w-[95%] text-left text-base md:text-lg rounded-2xl shadow-md">
      <input className="myChoice hidden" id={value} type="radio" name={name} value={value} />
      {value}
      <span className="inline-block relative w-5 h-5 rounded-full border border-green-950 ">
      <object className='check rotate-[-10deg] mt-1 ml-[1.5px] hidden' type="image/svg+xml" data={checkMark}/>
      </span>
      </label>
  );
};

const MultiChoice = ({options}) => {

  return (
    <div className="flex flex-col gap-4 md:gap-6 m-auto w-[70%] md:w-full min-w-[250px] max-w-[400px] py-1">
      {options.map((option) => (
        <Choice key={option.num} name={`${option.num}`} value={option.content} />
      ))}
    </div>
  );
};

export default MultiChoice;
