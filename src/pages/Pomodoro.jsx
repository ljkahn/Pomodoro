import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(25 * 60);
  };

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (time === 0) {
      setIsActive(false);
      if (!isBreak) {
        // If it's the end of the work session, start a 5-minute break
        setTime(5 * 60);
      } else {
        // If it's the end of the break, start a new 25-minute work session
        setTime(25 * 60);
      }
      setIsBreak(!isBreak);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive, isBreak, time]);

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>{formatTime(time)}</p>
      <button onClick={startTimer} disabled={isActive}>
        Start Timer
      </button>
      <button onClick={stopTimer} disabled={!isActive}>
        Stop Timer
      </button>
      <button onClick={resetTimer} disabled={isActive}>
        Reset Timer
      </button>
    </div>
  );
}

export default Pomodoro;
