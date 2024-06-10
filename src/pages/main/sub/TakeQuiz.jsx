import { useEffect, useRef, useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import MyButton from "../../../components/MyButton";
import MultiChoice from "../../../components/inputs/MultiChoice";
import Card from "../../../components/StackedCards";
import StackedCards from "../../../components/StackedCards";
const Modal = ({ modal, startQuiz }) => {
  const { modalVisible } = modal;

  return (
    <div className={modalVisible ? "block" : "hidden"}>
      <div className="fixed top-0 h-dvh w-dvw backdrop-blur-md z-10 flex items-center justify-center">
        <div className="min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <MyButton
            text={"Back"}
            changeWindow={"/Quizz_me"}
            className="hidden "
          />
          <MyButton
            text={"Start"}
            onClick={startQuiz}
            extraClass={
              "bg-green-900  text-white h-fit  px-[15%] md:px-[12%] py-2 md:py-3"
            }
          />
        </div>
      </div>
    </div>
  );
};

const Header = ({ timer, timerColor }) => {
  return (
    <header className="h-[50px] flex justify-between text">
      <a className="text-green-900 " href="/Quizz_me">
        <img src={backIcon} className="inline w-3 mr-2 mb-1" />
        Return
      </a>

      <div className={`text-xl md:text-2xl mr-2 bold w-10 ${timerColor}`}>
        {timer}
      </div>
    </header>
  );
};

const Main = ({ myCards, changeCards, questions }) => {

  return (
    <main className="flex-1 flex flex-col">
      <div className="mb-6 md:mb-16 text-xl md:text-2xl font-bold">7/10</div>
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
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const intRef = useRef(null);
  const maxTime = useRef({ mins: minutes, secs: seconds });
  const [timerColor, setTimerColor] = useState(" text-black");

  //initial modal
  const [modalVisible, setModalVisibility] = useState(true);
  const modal = { modalVisible, setModalVisibility };
  //myQuestions
  const questions = [
    { id: 1, question: "What is React?" },
    { id: 2, question: "What is Tailwind CSS?" },
    { id: 3, question: "How do you use hooks in React?" },
    // Add more questions as needed
  ];
  //cards kini
  const [currentCardIndex, setcurrentCardIndex] = useState(0);

  const myCards = { currentCardIndex, setcurrentCardIndex };

  const changeCards = {
    handleNext: () => {
      currentCardIndex < questions.length - 1
        ? setcurrentCardIndex((prevIndex) => prevIndex + 1)
        : null;
    },
    handlePrev: () => {
      currentCardIndex > 0
        ? setcurrentCardIndex((prevIndex) => prevIndex - 1)
        : null;
    },
  };
  //
  useEffect(() => {
    return () => {
      if (intRef.current) {
        clearInterval(intRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (intRef.current) {
      clearInterval(intRef.current);
    }
    let newMinutes = minutes;
    intRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        let newSeconds = prevSeconds - 1;
        //changing mins
        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes = minutes - 1;
          setMinutes(newMinutes);
        }
        //stopping timer
        if (newSeconds === 0 && newMinutes === 0) {
          clearInterval(intRef.current);
        }

        // Update timer color based on time elapsed
        if (
          newMinutes * 60 + newSeconds ===
          Math.round((maxTime.current.mins * 60 + maxTime.current.secs) / 2)
        ) {
          setTimerColor("text-orange-300");
        }
        if (
          newMinutes * 60 + newSeconds ===
          Math.round((maxTime.current.mins * 60 + maxTime.current.secs) / 4)
        ) {
          setTimerColor("text-red-600");
        }

        return newSeconds;
      });
    }, 1000);
  };

  const startQuiz = () => {
    startTimer();
    setModalVisibility(false);
  };

  const timer = () => {
    const strSecs = seconds < 10 ? `0${seconds}` : seconds;
    const strMins = minutes < 10 ? `0${minutes}` : minutes;
    return `${strMins}:${strSecs}`;
  };

  return (
    <div>
      <Modal modal={modal} startQuiz={startQuiz} />
      <div className="baloo h-dvh flex flex-col py-4 px-6 md:px-14 lg:px-[10%] text-center ">
        <Header timer={timer()} timerColor={timerColor} />
        <Main myCards={myCards} changeCards={changeCards} questions={questions}/>
        <footer className="min-h-[80px] lg:h-[100px] flex justify-center items-center gap-6 md:mt-4">
          <MyButton
            onClick={changeCards.handlePrev}
            text={"Previous"}
            outline="outline-green-600"
            extraClass={
              "bg-white text-green-900 h-fit px-[15%] md:px-[12%] py-2 md:py-3"
            }
          />
          <MyButton
            onClick={changeCards.handleNext}
            text={"Next"}
            outline="outline-green-900"
            hover={"hovss"}
            extraClass={
              "bg-green-900  text-white h-fit  px-[15%] md:px-[12%] py-2 md:py-3"
            }
          />
        </footer>
      </div>
    </div>
  );
};

export default TakeQuiz;
