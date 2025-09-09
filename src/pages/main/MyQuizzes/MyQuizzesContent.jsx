import { useState, useEffect } from "react";
import { CreateQuizButton, MyButton } from "../../../components/MyButtons";
import { getQuizzesByUser } from "../../../services/quiz";

const Quizzes = ({ quiz }) => {
  const { title, questLength } = quiz;

  return (
    <div className="relative flex-1 h-48 max-w-sm rounded-lg shadow-lg max-sm:mx-auto basis-52 shadow-gray-500 hover:shadow-gray-400">
      <div className="box-bg-image opacity-80 "></div>
      <div className="subBG  bg-[#a7d231]"></div>

      <h3 className="mt-5 ml-5 text-white w-fit max-w-36 backdrop-blur-sm">
        {title}
      </h3>
      <h3 className="mx-5 mt-auto ml-auto text-white backdrop-blur-3xl">
        {questLength} question{questLength > 1 ? "s" : ""}
      </h3>
      <div className="flex justify-between w-full p-3">
        <MyButton
          text={"Take quiz"}
          changeWindow={`/TakeQuiz/${quiz.id}`}
          extraClass="quiz-button bg-white py-1 pt-2 px-2 rounded-2xl"
        />
        <MyButton
          text={"Manage"}
          changeWindow={`/ManageQuiz/${quiz.id}`}
          extraClass="quiz-button bg-white py-1 pt-2 px-2 rounded-2xl"
        />
      </div>
    </div>
  );
};
const MQContent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? JSON.parse(userId) : null;

  useEffect(() => {
    setIsLoading(true);
    getQuizzesByUser(parsedUserId)
      .then((myQuizes) => setQuizzes(myQuizes))
      .then(() => setIsLoading(false));
  }, []);

  const searchedQuiz = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchText.toLowerCase().split(" ").join(""))
  );

  return (
    <main>
      <label className="relative block mx-auto searchBar w-fit">
        <input
          className="search transition-all pl-3 pr-10 pt-2 pb-1 h-10 rounded-[17px] text-green-800 placeholder:text-inherit outline-[inherit] md:min-w-[25dvw] focus:min-w-[35dvw] "
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for your quiz"
        />
      </label>
      {/* loading status indicator */}
      {isLoading && (
        <h1 className="mt-6 text-center text-gray-600 md:mt-12">
          Searching...
        </h1>
      )}
      {/* Quizes */}
      {!isLoading && (
        <div className="flex flex-wrap gap-6 m-3 mt-10 gap-y-10 md:gap-8 lg:gap-12 quiz-content">
          {searchedQuiz.length ? (
            searchedQuiz.map((quiz) => <Quizzes key={quiz.id} quiz={quiz} />)
          ) : (
            <h1 className="mx-auto text-green-700">No quizzes here...</h1>
          )}
        </div>
      )}
      <CreateQuizButton
        text={"Create a new Quiz"}
        changeWindow={"/CreateQuiz"}
        hover={"hover:brightness-150"}
        outline={"outline-white"}
      />
    </main>
  );
};
export default MQContent;
