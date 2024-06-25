import { useEffect, useRef, useState } from "react";

const Timer = ({ quizDone, startQuiz, initialHours, initialMinutes, initialSeconds }) => {
  // const [seconds, setSeconds] = useState(initialSeconds);
  // const [minutes, setMinutes] = useState(initialMinutes);
  const [time, setTime] = useState({
    hrs: initialHours,
    mins: initialMinutes,
    secs: initialSeconds ? initialSeconds : 0,
  });
  
  const [timerColor, setTimerColor] = useState("text-black");
  const intRef = useRef(null);
  const maxTime = useRef({
    hrs: initialHours,
    mins: initialMinutes,
    secs: initialSeconds ? initialSeconds : 0,
  });

  useEffect(() => {
    return () => {
      if (intRef.current) {
        clearInterval(intRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setTime({
      hrs: initialHours,
      mins: initialMinutes,
      secs: initialSeconds ? initialSeconds : 0,
    });
    maxTime.current = {
      hrs: initialHours,
      mins: initialMinutes,
      secs: initialSeconds ? initialSeconds : 0,
    };
  }, [initialHours, initialMinutes, initialSeconds]);


  const startTimer = () => {
    if (intRef.current) {
      clearInterval(intRef.current);
    }
    intRef.current = setInterval(() => {
      setTime((prevTime) => {
        let newHrs = prevTime.hrs;
        let newMins = prevTime.mins;
        let newSecs = prevTime.secs - 1;

        if (newSecs < 0) {
          newSecs = 59;
          newMins -= 1;

          if (newMins < 0) {
            newMins = 59;
            newHrs -= 1;
          }
        }

        if (newSecs === 0 && newMins === 0 && newHrs === 0) {
          quizDone()
          clearInterval(intRef.current);
        }

        const totalTime =
          maxTime.current.hrs * 3600 +
          maxTime.current.mins * 60 +
          maxTime.current.secs;
        const currentTime = newHrs * 3600 + newMins * 60 + newSecs;

        if (currentTime === Math.round(totalTime / 2)) {
          setTimerColor("text-orange-300");
        }
        if (currentTime === Math.round(totalTime / 4)) {
          setTimerColor("text-red-600");
        }

        return { hrs: newHrs, mins: newMins, secs: newSecs };
      });
    }, 1000);
  };
  
  useEffect(() => {
    if (startQuiz) {
      startTimer();
    }
  }, [startQuiz]);

  const timer = () => {
    const strSecs = time.secs < 10 ? `0${time.secs}` : time.secs;
    const strMins = time.mins < 10 ? `0${time.mins}` : time.mins;
    return `${time.hrs ? time.hrs + ":" : ""}${strMins}:${strSecs}`;
  };

  return (
    <div className={`text-xl md:text-2xl mr-8 bold w-10 ${timerColor}`}>
      {timer()}
    </div>
  );
};

export default Timer;
