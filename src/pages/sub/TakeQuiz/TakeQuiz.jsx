import { useContext, useEffect, useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import { MyButton } from "../../../components/MyButtons";
import StackedCards from "./StackedCards";
import Timer from "./Timer";
import MyModal from "../../../components/Modal";
import MyChoice from "./MyChoice";
import { MyStates } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addPerformance, baseURL, getQuizById } from "../../../services/quiz";
import MyNotification from "../../../components/MyNotifications";

const Header = ({ startQuiz, quizDone, initialHours, initialMinutes }) => {
  return (
    <header className="h-[50px] flex justify-between text">
      <a className="text-green-900 " href="/Quizz_me">
        <img src={backIcon} className="inline w-3 mr-2 mb-1" alt="Back" />
        Return
      </a>
      <Timer
        startQuiz={startQuiz}
        initialHours={initialHours}
        initialMinutes={initialMinutes}
        quizDone={quizDone}
      />
    </header>
  );
};

const Main = ({ myCards, changeCards, questions }) => {
 
  return (
    <main className="flex-1 flex flex-col">
      <div className="mb-6 md:mb-16 text-xl md:text-2xl font-bold">
        {`Question ${myCards.currentIndex + 1}/${questions.length}`}
      </div>
      <div className="flex-1 grid md:grid-cols-custom-1 max-md:grid-rows-custom-1 gap-10">
        <StackedCards
          myCards={myCards}
          questions={questions}
          changeCards={changeCards}
        />
        <div className="flex overflow-y-auto overflow-x-hidden">
          {questions[myCards.currentIndex] ? (
            <MyChoice
              index={myCards.currentIndex}
              question={questions[myCards.currentIndex]}
            />
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </main>
  );
};

const Modal = ({ handleStartQuiz, modalVisible, modalOff, quizDone }) => {
  const navigate = useNavigate();
  if (modalVisible === "submit") {
    return (
      <MyModal modalVisible={modalVisible}>
        <div className="flex flex-col justify-between relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <h2 className="self-center text-center mx-auto my-auto">
            Are you sure you want to submit?
          </h2>
          <div className="flex w-[inherit] ">
            <MyButton
              text="Resume Quiz"
              onClick={modalOff}
              extraClass="bg-green-900 text-white h-fit px-[10%] py-2 m-3 text-nowrap"
            />
            <MyButton
              text="Submit"
              onClick={quizDone}
              extraClass="bg-green-900 text-white h-fit px-[20%] py-2 m-3"
            />
          </div>
        </div>
      </MyModal>
    );
  }
  if (modalVisible === "done") {
    return (
      <MyModal modalVisible={modalVisible}>
        <div className="flex flex-col justify-between relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <div className="grow-1 my-auto">
            <h1 className="self-center text-center m-auto">Done!</h1>
            <h2 className="self-center text-center mx-4">
              Your results have been uploaded to the Quiz Owner
            </h2>
          </div>
          <MyButton
            text="Back to MyQuizzes"
            onClick={() => navigate("/MyQuizzes")}
            extraClass="bg-green-900 text-white h-fit px-[20%] py-2 m-3 text-nowrap mx-auto"
          />
        </div>
      </MyModal>
    );
  }
  return (
    <MyModal modalVisible={modalVisible}>
      <div className="flex flex-col justify-between relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
        <div className="">
          <MyButton
            text="Back"
            changeWindow="/Quizz_me"
            extraClass="top-2 left-2 font-semibold"
          />
        </div>
        <h1 className="self-center">Start Quiz?</h1>
        <div className="self-center w-[inherit]">
          <MyButton
            text="Start"
            onClick={handleStartQuiz}
            extraClass="bg-green-900 text-white h-fit px-[40%] py-2 m-3"
          />
        </div>
      </div>
    </MyModal>
  );
};

const TakeQuiz = () => {
  const { id } = useParams();

  const {
    data: quiz,
    isLoading,
    isSuccess,
  } = useQuery({
    queryFn: () => getQuizById(id),
    queryKey: ["quiz", id],
  });

  const { state, setters } = useContext(MyStates);

  const [modalVisible, setModalVisibility] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if(startQuiz){
      const handleBeforeUnload = (e) => {
          e.preventDefault();
          setNotification('something')
          e.returnValue = '';
          return 'Refresh will auto submit Quiz'
          
      };

      const handleUnload = () => {
         navigator.sendBeacon(`${baseURL}/Performance`,JSON.stringify(state.performance));
        };
  
      window.addEventListener('beforeunload', (e)=>{handleBeforeUnload(e)});
      window.addEventListener('unload', handleUnload);

      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.removeEventListener('unload', handleUnload);
      };
    }

}, [startQuiz,state.performance]);

  useEffect(() => {
    if (isSuccess) {
      setters.setQuiz(quiz);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (state.myQuiz.id) {
      const answers = state.myQuiz.questions.map((q) => ({
        id: q.id,
        chosenAnswers: [],
        correctAnswers: q.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.content),
      }));
      const chosenAnswers = state.myQuiz.questions.map((question) => ({
        id: question.id,
        content: [],
      }));
      const correctAnswers = state.myQuiz.questions.map((q) => ({
        id: q.id,
        content: q.options
          .filter((opt) => opt.isCorrect)
          .map((opt) => opt.content),
      }));
      setters.setPerformance({
        chosenAnswers,
        correctAnswers,
        answers,
        quizID: state.myQuiz.id,
      });
    }
  }, [state.myQuiz]);

  console.log(state.performance)
  const questions = state.myQuiz.questions || [];
  const myCards = { currentIndex, setCurrentIndex };
  const myTime = state.myQuiz.time.split(":");

  const changeCards = {
    handleNext: () => {
      setCurrentIndex((prevIndex) =>
        prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
      );
    },
    handlePrev: () => {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    },
  };

  const handleStartQuiz = () => {
    setModalVisibility(false);
    setStartQuiz(true);
  };

  const quizDone = () => {
    addPerformance(state.performance).then((result) => {
      setTimeout(() => setModalVisibility("done"), 1000);
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="baloo">
      <Modal
        modalVisible={modalVisible}
        handleStartQuiz={handleStartQuiz}
        modalOff={() => setModalVisibility(false)}
        quizDone={quizDone}
      />
      <MyNotification notification={notification} setNotification={()=>setNotification('something sha')}>
      Refresh will auto submit Quiz
      </MyNotification>
      <div className="h-dvh flex flex-col py-4 px-6 md:px-14 lg:px-[10%] text-center">
        <Header
          startQuiz={startQuiz}
          initialHours={Number(myTime[0])}
          initialMinutes={Number(myTime[1])}
          quizDone={quizDone}
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
          {currentIndex + 1 === questions.length ? (
            <MyButton
              onClick={() => setModalVisibility("submit")}
              text="Submit"
              outline="outline-green-600"
              extraClass="bg-white text-green-900 h-fit px-[15%] md:px-[12%] py-2 md:py-3"
            />
          ) : (
            <MyButton
              onClick={changeCards.handleNext}
              text="Next"
              outline="outline-green-900"
              extraClass="bg-green-900 text-white h-fit px-[15%] md:px-[12%] py-2 md:py-3"
            />
          )}
        </footer>
      </div>
    </div>
  );
};

export default TakeQuiz;
