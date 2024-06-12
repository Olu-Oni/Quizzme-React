import {useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import MyButton from "../../../components/MyButton";
import MultiChoice from "../../../components/inputs/MultiChoice";
import StackedCards from "./StackedCards";
import Timer from "./Timer";
import Modal from "./Modal";

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
        {`${myCards.currentCardIndex+1}/${questions.length}`}
      </div>
      <div className="flex-1 grid md:grid-cols-custom-1 max-md:grid-rows-custom-1 gap-10">
        <StackedCards
          myCards={myCards}
          questions={questions}
          changeCards={changeCards}
        />
        <div className="flex overflow-y-auto overflow-x-hidden">
          <MultiChoice />
        </div>
      </div>
    </main>
  );
};

const TakeQuiz = () => {
  const [modalVisible, setModalVisibility] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const questions = [
    { id: 1, question: "What is React?" },
    { id: 2, question: "What is Tailwind CSS?" },
    { id: 3, question: "How do you use hooks in React?" },
    // Add more questions as needed
  ];

  const myCards = { currentCardIndex, setCurrentCardIndex };

  const changeCards = {
    handleNext: () => {
      setCurrentCardIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
    },
    handlePrev: () => {
      setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    },
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
    setModalVisibility(false);
  };

  return (
    <div>
      <Modal modalVisible={modalVisible} startQuiz={handleStartQuiz} />
      <div className="baloo h-dvh flex flex-col py-4 px-6 md:px-14 lg:px-[10%] text-center">
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