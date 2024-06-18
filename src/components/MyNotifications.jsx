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
        // Ensure remainingTime doesn't go below 0
        const updatedRemainingTime = Math.max(remainingTime - 300, -300);
        setRemainingTime(updatedRemainingTime);
        console.log(updatedRemainingTime);
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
      } fixed bottom-3 left-3 flex bg-white text-green-400 rounded-lg duration-500 h-24 max-md:w-[45%] w-[30%] outline outline-2 outline-slate-300 z-30 -translate-x-[110%] overflow-hidden`}
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
