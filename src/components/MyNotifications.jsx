import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const MyNotification = ({ notification, setNotification, time, children }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (notification === "") {
      setRemainingTime(time); // Reset remaining time on hide
    }
    if (notification) {
      const intervalId = setInterval(() => {
        // Ensure remainingTime doesn't go below 0...lol
        const updatedRemainingTime = Math.max(remainingTime - 300, -300);
        setRemainingTime(updatedRemainingTime);
        if (updatedRemainingTime <= -300) {
          setNotification("");
        }
      }, 300);

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [notification, remainingTime, time]);

  const progress = (remainingTime / time) * 95; // Calculate progress percentage

  return (
    <div
      className={`${
        notification ? "notification_slide" : ""
      } fixed bottom-3 left-3 flex flex-col bg-white text-green-400 rounded-lg duration-500 h-32 max-md:w-[80%] w-[50%] outline outline-2 outline-slate-300 z-50 -translate-x-[110%] overflow-hidden text-center`}
    >
      {children}
      <Box sx={{ width: "100%", position: "absolute", bottom: "0px" }}>
        <LinearProgress
          color="inherit"
          variant="determinate"
          value={progress}
        />
      </Box>
      {/* <progress value={progress} max="100"/> */}
    </div>
  );
};

export default MyNotification;
