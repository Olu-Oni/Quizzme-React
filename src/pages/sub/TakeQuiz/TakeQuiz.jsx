import { useContext, useEffect, useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import { MyButton } from "../../../components/MyButtons";
import StackedCards from "./StackedCards";
import Timer from "./Timer";
import MyModal from "../../../components/Modal";
import MyChoice from "./MyChoice";
import { MyStates } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getQuizById } from "../../../services/quiz";
import MyNotification from "../../../components/MyNotifications";

const Header = ({ startQuiz, quizDone, initialHours, initialMinutes }) => {
  return (
    <header className="h-[50px] flex justify-between text">
      <a className="text-green-900 " href="/Quizz_me">
        <img src={backIcon} className="inline w-3 mb-1 mr-2" alt="Back" />
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
    <main className="flex flex-col flex-1">
      <div className="mb-6 text-xl font-bold md:mb-16 md:text-2xl">
        {`Question ${myCards.currentIndex + 1}/${questions.length}`}
      </div>
      <div className="grid flex-1 gap-10 md:grid-cols-custom-1 max-md:grid-rows-custom-1">
        <StackedCards
          myCards={myCards}
          questions={questions}
          changeCards={changeCards}
        />
        <div className="flex overflow-x-hidden overflow-y-auto">
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

const Modal = ({ handleStartQuiz, modalVisible, modalOff, quizDone, myScore }) => {
  const navigate = useNavigate();
  if (modalVisible === "submit") {
    return (
      <MyModal modalVisible={modalVisible}>
        <div className="flex flex-col justify-between items-center relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <h2 className="self-center mx-auto my-auto text-center">
            Are you sure you want to submit?
          </h2>
          <div className="flex justify-center">
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
        <div className="flex flex-col justify-between items-center relative min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <div className="flex flex-col items-center gap-2 my-auto grow-1">
            {myScore.correct>=myScore.total?<h1 className="self-center m-auto text-2xl text-center text-green-600">Well Done!</h1>:<h1 >Nice try</h1>}
            <div className="flex justify-center mx-auto my-2">
            <h1 className="inline">you scored: &nbsp; &nbsp;</h1> <h1 className={myScore.correct>=myScore.total?'inline text-green-600':' inline text-red-500'}>{myScore.correct}/{myScore.total}</h1>

            </div>
            <h2 className="self-center mx-4 my-4 text-center">
              Your results have been uploaded to the Quiz Owner
            </h2>
          </div>
          <MyButton
            text="Back to Quizzes"
            onClick={() => navigate("/Quizz_me")}
            extraClass="bg-green-900 text-white h-fit px-[20%] py-2 m-3 text-nowrap mx-auto self-center"
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
const loc = useLocation()
console.log(loc)
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
  
  const [notification, setNotification] = useState("");
  
  useEffect(() => {
    if (startQuiz) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        // setNotification("something");
        e.returnValue = "";
        return "Refresh will auto submit Quiz";
      };

      const handleUnload = () => {
        navigator.sendBeacon(
          `/Performance`,
          JSON.stringify(state.performance)
        );
      };

      window.addEventListener("beforeunload", (e) => {
        handleBeforeUnload(e);
      });
      window.addEventListener("unload", handleUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("unload", handleUnload);
      };
    }
  }, [startQuiz, state.performance]);

  useEffect(() => {
    if (isSuccess) {
      setters.setQuiz(quiz);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (state.myQuiz.id) {
      const answers = state.myQuiz.questions.map((q) => ({
        id: q.id,
        type: q.type,
        chosenAnswers: [],
        correctAnswers: q.type === 'text'
          ? q.options.filter((opt) => opt.isCorrect).map((opt) => (typeof opt.content === 'string' ? opt.content.split(',') : [opt.content])).flat()
          : q.options.filter((opt) => opt.isCorrect).map((opt) => opt.content),
      }));
      console.log(answers)
      setters.setPerformance({
        answers,
        quizID: state.myQuiz.id,
        quizTitle: state.myQuiz.title,
      });
    }
  }, [state.myQuiz]);

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
    const {performance:{answers}} = state
    const arraysEqual = (arr1, arr2, type) => {
      //text answer
      if (type === 'text') {
        // Normalize text answers (trim whitespace and convert to lowercase)
        const normalize = (str) => str.trim().toLowerCase();
        const normalizedArr1 = arr1.map(normalize);
        const normalizedArr2 = arr2.map(normalize);
        
        // Check if at least one normalized answer matches
        return normalizedArr2.some(answer1 => normalizedArr1.includes(answer1));
      }
      
      if (arr1.length !== arr2.length) return false; // Check if lengths are the same
    
      const sortedArr1 = arr1.slice().sort();
      const sortedArr2 = arr2.slice().sort();
  
      for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i]!== sortedArr2[i]) return false;//multichoice and checkbox checks
      }
    
      return true;
    };
    //calculating total coorect
    const score = answers.map(ans=>arraysEqual(ans.chosenAnswers, ans.correctAnswers,ans.type)?1:0).reduce((acc,cur)=>acc+cur)
    setters.setPerformance({...state.performance, score:score})
    console.log(state.performance, `${score}/${questions.length}`)
    setModalVisibility("done")
    // addPerformance(state.performance).then(() => {
    //   setTimeout(() => setModalVisibility("done"), 1000);
    // });
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
        myScore={{correct:state.performance.score,total:questions.length}}
      />
      {/* <MyNotification
        notification={notification}
        setNotification={() => setNotification("something sha")}
        time={3}
      >
        Refresh will auto submit Quiz
      </MyNotification> */}
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
