const Quizzes = ({ title, num }) => {
  return (
    <div className=" relative w-52 h-48 rounded-lg shadow-gray-500 shadow-lg hover:shadow-gray-400">
      <div className="box-bg-image opacity-80 "></div>
      <div className="subBG  bg-[#a7d231]"></div>

      <h3 className="w-fit ml-5 mt-5 max-w-36 text-white backdrop-blur-sm">
        {title}
      </h3>
      <h3 className=" mx-5 mt-auto ml-auto text-white backdrop-blur-3xl">
        {num} questions
      </h3>
      <div className="p-2 m-1 flex justify-between">
        <button className="quiz-button cursor-pointer bg-white py-1 pt-2 px-2 rounded-2xl">
          Take Quiz
        </button>
        <button className="quiz-button cursor-pointer bg-white py-1 pt-2 px-2 rounded-2xl text-">
          Manage
        </button>
      </div>
    </div>
  );
};
const MQContent = () => {
  return (
    <main>
      <label className="searchBar relative block mx-auto w-fit">
        <input
          className="search transition-all pl-3 pr-10 pt-2 pb-1 h-10 rounded-[17px] text-green-800 placeholder:text-inherit outline-[inherit] md:min-w-[25dvw] focus:min-w-[35dvw] "
          type="text"
          placeholder="Search for your quiz"
        />
      </label>
      <div className="quiz-grid m-3 mt-10 grid">
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
        <Quizzes title="Mathssss" num={45} />
      </div>
    </main>
  );
};
export default MQContent;
