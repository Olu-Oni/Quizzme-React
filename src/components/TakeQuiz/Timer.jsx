import { useEffect, useRef, useState } from "react";

const Timer = ({ startQuiz, initialMinutes, initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [timerColor, setTimerColor] = useState("text-black");
  const intRef = useRef(null);
  const maxTime = useRef({ mins: initialMinutes, secs: initialSeconds });

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
    let newMinutes = initialMinutes;
    intRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        let newSeconds = prevSeconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
          setMinutes(newMinutes);
        }

        if (newSeconds === 0 && newMinutes === 0) {
          clearInterval(intRef.current);
        }

        const totalTime = maxTime.current.mins * 60 + maxTime.current.secs;
        const currentTime = newMinutes * 60 + newSeconds;

        if (currentTime === Math.round(totalTime / 2)) {
          setTimerColor("text-orange-300");
        }
        if (currentTime === Math.round(totalTime / 4)) {
          setTimerColor("text-red-600");
        }

        return newSeconds;
      });
    }, 1000);
  };

  useEffect(() => {
    if (startQuiz) {
      startTimer();
    }
  }, [startQuiz]);

  const timer = () => {
    const strSecs = seconds < 10 ? `0${seconds}` : seconds;
    const strMins = minutes < 10 ? `0${minutes}` : minutes;
    return `${strMins}:${strSecs}`;
  };

  return (
    <div className={`text-xl md:text-2xl mr-2 bold w-10 ${timerColor}`}>
      {timer()}
    </div>
  );
};

export default Timer;
