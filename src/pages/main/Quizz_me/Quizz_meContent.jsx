import { useEffect, useState } from "react";
import searchImg from "../../../../images/icon_Search.png";
import { MyButton } from "../../../components/MyButtons";
import {
  getAllQuizzes,
  getQuizzesByUser,
  searchQuizzes,
} from "../../../services/quiz";

const Quizzes = ({ quiz }) => {
  const { title, questLength, userId, id } = quiz;
  const author = `${userId}`;

  return (
    <div className="relative flex-1 h-48 max-w-xs rounded-lg shadow-lg max-sm:mx-auto basis-52 shadow-gray-500 hover:shadow-gray-400">
      <div className="box-bg-image opacity-80 "></div>
      <div className="subBG  bg-[#0ab6fa]"></div>

      <h3 className="mt-5 ml-5 text-white w-fit max-w-36 backdrop-blur-sm">
        {title}
      </h3>
      <h3 className="mx-5 mt-5 text-white w-fit backdrop-blur-sm">
        By: {author}{" "}
      </h3>
      <h3 className="mx-5 mt-auto ml-auto text-white backdrop-blur-3xl">
        {questLength} questions
      </h3>
      <div className="flex justify-center w-full p-3">
        <MyButton
          text="Take Quiz"
          extraClass="w-full max-w-[250px]  bg-white"
          changeWindow={`/TakeQuiz/${id}`}
          disabled={questLength > 0 ? false : true}
        />
      </div>
    </div>
  );
};

const QmContent = () => {
  const [allQuizzes, setAllQuizzes] = useState([]); // Store ALL quizzes
  const [displayQuizzes, setDisplayQuizzes] = useState([]); // Quizzes to display
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    // Load all quizzes initially
    getAllQuizzes().then((quizzes) => {
      setAllQuizzes(quizzes);
      setDisplayQuizzes(quizzes);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSearching(true);

    if (!searchText.trim()) {
      // If search is empty, show all quizzes
      setDisplayQuizzes(allQuizzes);
      setIsSearching(false);
      return;
    }

    try {
      const searchResults = await searchQuizzes(searchText);
      console.log("Search results:", searchResults);
      setDisplayQuizzes(searchResults);
      setIsSearching(false);
    } catch (error) {
      console.error("Search failed:", error);
      // Fallback to client-side filtering if server search fails
      const filtered = allQuizzes.filter(
        (q) =>
          q.title?.toLowerCase().includes(searchText.toLowerCase()) ||
          q.userId?.toLowerCase().includes(searchText.toLowerCase())
      );
      setDisplayQuizzes(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchText("");
    setDisplayQuizzes(allQuizzes);
    setIsSearching(false);
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center mx-auto w-fit"
      >
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search transition-all pl-3 pr-2 pt-2 pb-1 h-10 rounded-s-[17px] text-green-700 placeholder:text-inherit outline-[inherit] md:min-w-[25dvw] focus:md:min-w-[35dvw]"
          type="text"
          placeholder="Search by title and Author (case sensitive)"
        />
        <button
          type="submit"
          // disabled={!searchText}
          className="rounded-e-2xl duration-[010ms] ease-in bg-white ml-[4px] w-10 h-[53.2px] scale-75 opacity-70 active:opacity-30 active:scale-[60%] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <img src={searchImg} alt="search icon" className="ml-1 w-7" />
        </button>

        {searchText && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="px-3 py-1 ml-2 text-sm text-white bg-red-500 rounded-md"
          >
            Clear
          </button>
        )}
      </form>

      {/* Search status indicator */}
      {isSearching && (
        <h1 className="mt-6 text-center text-gray-600 md:mt-12">Searching...</h1>
      )}

      {searchText && !isSearching && displayQuizzes.length === 0 && (
        <h1 className="mt-6 text-center text-gray-600 md:mt-12">
          No quizzes found for "{searchText}"
        </h1>
      )}
      {!isSearching && (
        <div className="flex flex-wrap gap-6 m-3 mt-10 gap-y-10 md:gap-8 lg:gap-12 quiz-content">
          {displayQuizzes.length ? (
            displayQuizzes.map((quiz) => (
              <Quizzes
                key={quiz.id}
                quiz={{
                  ...quiz,
                  userId: quiz.userId || UserId, // Use actual userId if available
                  questLength: quiz.questions
                    ? quiz.questions.length
                    : quiz.questLength || 0,
                }}
              />
            ))
          ) : !searchText ? (
            <h1 className="mx-auto text-green-700">No quizzes available...</h1>
          ) : null}
        </div>
      )}
    </main>
  );
};

export default QmContent;
