import useCustomStopwatch from "./CustomHook";
import React, { useEffect, useState } from "react";

function Timer() {
  const initialTotalSeconds =
    typeof window !== "undefined" // Check if running in a browser context
      ? parseInt(localStorage.getItem("totalSeconds") as any) || 0
      : 0;

  const { seconds, isRunning, start, pause, reset } =
    useCustomStopwatch(initialTotalSeconds);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if running in a browser context
      localStorage.setItem("totalSeconds", seconds.toString());
      if (seconds === 100 && isRunning) {
        pause(); // Pause the timer when seconds reach 300 and isRunning is true
      }
    }
  }, [seconds, isRunning]);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return (
    <div className="text-white text-5xl my-12 ">
      <div className="font-bold">
        <span className="mx-2">{hours} Hours</span>:
        <span className="mx-2">{minutes} Minutes</span>:
        <span className="mx-2">{seconds % 60} Seconds</span>
      </div>
      <p className="mt-12">{isRunning ? "CTF-ONGOING!" : "TIME-UP!!"}</p>
      <div className="flex space-x-12 justify-center">
        {isRunning ? (
          ""
        ) : (
          <button
            className={`${`bg-red-500`} pl-6 rounded-lg  my-4 pr-6`}
            onClick={start}
          >
            START
          </button>
        )}

        {!isRunning && (
          <button
            disabled={isRunning}
            className={`${`bg-red-500`} pl-6 rounded-lg  my-4 pr-6`}
            onClick={reset}
          >
            reset
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;
