import searchImg from "../../../images/icon_Search.png";
import MyButton from "../MyButton";
const Quizzes = ({ title, num, author }) => {
  return (
    <div className=" relative w-52 h-48 rounded-lg shadow-gray-500 shadow-lg hover:shadow-gray-400">
      <div className="box-bg-image opacity-80 "></div>
      <div className="subBG  bg-[#0ab6fa]"></div>

      <h3 className="w-fit ml-5 mt-5 max-w-36 text-white backdrop-blur-sm">
        {title}
      </h3>
      <h3 className="w-fit mx-5 mt-5 text-white backdrop-blur-sm">
        By: {author}{" "}
      </h3>
      <h3 className=" mx-5 mt-auto ml-auto text-white backdrop-blur-3xl">
        {num} questions
      </h3>
      <div className="p-2 m-1">
        <MyButton
          text="Take Quiz"
          bgColor="white"
          txtColor={"black"}
          extraClass="w-full"
        />
      </div>
    </div>
  );
};
const QmContent = () => {
  return (
    <main className="">
      <label className="relative block mx-auto w-fit">
        <input
          className="search transition-all pl-3 pr-10 pt-2 pb-1 h-10 rounded-[17px] text-green-700 placeholder:text-inherit outline-[inherit] md:min-w-[25dvw] focus:min-w-[35dvw] "
          type="text"
          placeholder="Search by name or author"
        />
        <button className="relative duration-[010ms] ease-in top-2 right-10 scale-75 opacity-70 active:opacity-30 active:scale-[60%]">
          <img src={searchImg} alt="search icon" />
        </button>
      </label>
      <div className="quiz-grid m-3 mt-10 grid ">
        <Quizzes title={"Mathssss"} num={45} author={"Oluuu"} />
        <Quizzes title={"Mathssss"} num={45} author={"Oluuu"} />
        <Quizzes title={"Mathssss"} num={45} author={"Oluuu"} />
      </div>
    </main>
  );
};
export default QmContent;
