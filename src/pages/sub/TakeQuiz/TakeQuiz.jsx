import {useContext, useEffect, useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import {MyButton} from "../../../components/MyButtons";
import MultiChoice from "./MultiChoice";
import StackedCards from "./StackedCards";
import Timer from "./Timer";
import MyModal from "../../../components/Modal";
import { MyStates } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuizById } from "../../../services/quiz";

const Header = ({ startQuiz, initialMinutes, initialSeconds }) => {
  return (
    <header className="h-[50px] flex justify-between text">
      <a className="text-green-900 " href="/Quizz_me">
        <img src={backIcon} className="inline w-3 mr-2 mb-1" />
        Return
      </a>

      <Timer
        startQuiz={startQuiz}
        initialMinutes={initialMinutes}
        initialSeconds={initialSeconds}
      />
    </header>
  );
};

const Main = ({ myCards, changeCards, questions }) => {
  
  return (
    <main className="flex-1 flex flex-col">
      <div className="mb-6 md:mb-16 text-xl md:text-2xl font-bold">
        {`Question ${myCards.currentIndex+1}/${questions.length}`}
      </div>
      <div className="flex-1 grid md:grid-cols-custom-1 max-md:grid-rows-custom-1 gap-10">
        <StackedCards
          myCards={myCards}
          questions={questions}
          changeCards={changeCards}
        />
        <div className="flex overflow-y-auto overflow-x-hidden">
          {questions[myCards.currentIndex]?<MultiChoice options={questions[myCards.currentIndex].options}/>:<h1>loading</h1>}
        </div>
      </div>
    </main>
  );
};

const Modal = ({handleStartQuiz, modalVisible}) =>{
  
  return(
    <MyModal modalVisible={modalVisible}>
      <div className="flex flex-col justify-between relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <div className="">
          <MyButton text="Back" changeWindow="/Quizz_me" extraClass={` top-2 left-2 font-semibold`}/>
          
          </div>
          <h1 className="self-center">
            Start Quiz?
          </h1>
          <div className="self-center w-[inherit]">
          <MyButton
            text="Start"
            onClick={handleStartQuiz}
            extraClass="bg-green-900 text-white h-fit px-[40%] py-2 m-3 "
          />
          </div>
        </div>
      </MyModal>
  )
}
const TakeQuiz = () => {
  const {id} = useParams()
  
  const {data:quiz, isLoading, isSuccess} = useQuery({
    queryFn: ()=>getQuizById(id),
    queryKey: ['quiz', id]
  })
  
  const [modalVisible, setModalVisibility] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  
  const {state, setters} = useContext(MyStates)
  useEffect(() => {
    if (isSuccess) {
      setters.setQuiz(quiz);
    }
  }, [isSuccess, quiz]);
  
  //My performance paramsa
  // userId,
  //   quizId,
  //   totalAttempts,
  //   averageScore,
  //   attemptedAt,
  //   chosenQuestions: [],
  //   correctQuestions: [],
  const questions = state.myQuiz.questions

  // const questions = [
  //   { id: 1, question: "What is React?" },
  //   { id: 2, question: "What is Tailwind CSS?" },
  //   { id: 3, question: "How do you use hooks in React?" },
  //   // Add more questions as needed
  // ];  

  const myCards = { currentIndex, setCurrentIndex };

  const changeCards = {
    handleNext: () => {
      setCurrentIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
    },
    handlePrev: () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    },
  };

  const handleStartQuiz = () => {
    setModalVisibility(false);
    setStartQuiz(true);
  };

   return (
    <div className="baloo">
      <Modal modalVisible={modalVisible} handleStartQuiz={handleStartQuiz}/>
      <div className="h-dvh flex flex-col py-4 px-6 md:px-14 lg:px-[10%] text-center">
        <Header
          startQuiz={startQuiz}
          initialMinutes={1}
          initialSeconds={1}
        />
        <Main
          myCards={myCards}
          changeCards={changeCards}
          questions={questions}
        />
        <footer className="min-h-[80px] lg:h-[100px] flex justify-center items-center gap-6 md:mt-4">
          <MyButton
            onClick={changeCards.handlePrev}
            text="Previous"
            outline="outline-green-600"
            extraClass="bg-white text-green-900 h-fit px-[15%] md:px-[12%] py-2 md:py-3"
          />
          <MyButton
            onClick={changeCards.handleNext}
            text="Next"
            outline="outline-green-900"
            hover="hovss"
            extraClass="bg-green-900 text-white h-fit px-[15%] md:px-[12%] py-2 md:py-3"
          />
        </footer>
      </div>
    </div>
  );
};

export default TakeQuiz;