import React, { useState, useEffect } from "react";

function Pomodoro() {
  const countdownTimer = () => {
    const initialTime = 25 * 60;
    const [time, setTime] = useState(initialTime);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0  ")}`;
    };

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(intervalId);
    }, []);
  };

  return;
  <div>
    <h1>Countdown Timer</h1>
    <p>{formatTime(time)}</p>
  </div>;
}

export default Pomodoro;
