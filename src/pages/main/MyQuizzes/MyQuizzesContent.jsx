import { useContext, useState } from "react";
import { CreateQuizButton, MyButton } from "../../../components/MyButtons";
import { getQuizzesByUser } from "../../../services/quiz";
import { useEffect } from "react";

const Quizzes = ({quiz}) => {
  const { title, questLength }= quiz

 
  return (
    <div className=" relative w-52 h-48 rounded-lg shadow-gray-500 shadow-lg hover:shadow-gray-400">
      <div className="box-bg-image opacity-80 "></div>
      <div className="subBG  bg-[#a7d231]"></div>

      <h3 className="w-fit ml-5 mt-5 max-w-36 text-white backdrop-blur-sm">
        {title}
      </h3>
      <h3 className=" mx-5 mt-auto ml-auto text-white backdrop-blur-3xl">
        {questLength} question{questLength>1?'s':''}
      </h3>
      <div className="p-2 m-1 flex justify-between">
        <button className="quiz-button cursor-pointer bg-white py-1 pt-2 px-2 rounded-2xl">
          Take Quiz
        </button>
        <MyButton text={'Manage'} changeWindow={`/ManageQuiz/${quiz.id}`} extraClass="quiz-button cursor-pointer bg-white py-1 pt-2 px-2 rounded-2xl text-"/>
          
      </div>
    </div>
  );
};
const MQContent = () => {
  const [quizzes, setQuizzes] = useState([]);
  const UserId = "User1";

  useEffect(() => {
    getQuizzesByUser(UserId).then((myQuizes) => setQuizzes(myQuizes));
  }, []);

  console.log(quizzes);
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
        {quizzes.map(quiz=><Quizzes key={quiz.id} quiz={quiz} />)}
        
      </div>
      <CreateQuizButton
        text={"Create a new Quiz"}
        changeWindow={"/CreateQuiz"}
        outline={"outline-green-800"}
      />
    </main>
  );
};
export default MQContent;
