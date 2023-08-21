import React, { useEffect, useState } from "react";
// import { useCustomStopwatch } from "./useCustomStopwatch"; // Replace with your path

export function useCustomStopwatch(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
  };
}

export default useCustomStopwatch