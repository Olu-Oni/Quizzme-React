import { useEffect, useState } from "react";
import backIcon from "../../../../images/arrow.svg";
import MyButton from "../../../components/MyButton";
const Modal = ({ modal }) => {
  const { modalVisible, setModalVisibility } = modal;
  
  return (
    <div className={modalVisible ? "block" : "hidden"}>
      <div className="fixed top-0 h-dvh w-dvw backdrop-blur-md z-10 flex items-center justify-center">
        <div className="min-w-72 w-[55%] min-h-96 bg-white border border-gray-300 rounded-xl">
          <MyButton
            text={"Back"}
            changeWindow={"/Quizz_me"}
            className="hidden "
          />
          <MyButton text={"Start"} onClick={() => setModalVisibility(false)} />
        </div>
      </div>
    </div>
  );
};

const Header = ({ timer }) => {
  return (
    <header className="h-[150px] flex text">
      <a className="text-green-900 " href="/Quizz_me">
        <img src={backIcon} className="inline w-3 mr-2 mb-1" />
        Return
      </a>
      <div className="flex-1 text-center mt-10 mr-8 text-xl font-bold">
        7/10
      </div>
      <div className="text-xl w-10">{timer}</div>
    </header>
  );
};
const TakeQuiz = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [modalVisible, setModalVisibility] = useState(true);
  const modal = { modalVisible, setModalVisibility };

  useEffect(() => {
    const time = setInterval(() => setSeconds(seconds + 1), 1000);
    if (seconds > 59){
        setSeconds(0)
        setMinutes(minutes+1)
    }
    return () => clearInterval(time);
  });
  const timer = `${minutes}:${seconds}`;
  return (
    <div>
      <Modal modal={modal} />
      <div className="baloo h-dvh flex flex-col py-4 px-10 md:px-14 lg:px-[10%]">
        <Header timer={timer} />
        <div className="flex-1 grid md:grid-cols-custom-1 max-md:grid-rows-custom-1 gap-5">
          <div className="  bg-slate-600"></div>
          <div className=" basis-[40%] bg-slate-600"></div>
        </div>
        <footer className="h-[150px] bg-slate-500"></footer>
      </div>
    </div>
  );
};

export default TakeQuiz;
