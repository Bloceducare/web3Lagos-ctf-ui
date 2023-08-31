// Timer.js
import React, { useEffect } from "react";
import {useCustomStopwatch} from "./CustomHook";

function Timer() {
  const { seconds, isRunning, start, resetAppState } = useCustomStopwatch();

  useEffect(() => {
    if (seconds <= 0) {
      resetAppState();
    }
  }, [seconds]);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="text-white text-5xl my-6">
      <div className="font-bold">
        <span className="mx-2 uppercase font-ocra">{hours} Hours</span>:
        <span className="mx-2 uppercase font-ocra">{minutes} Minutes</span>:
        <span className="mx-2 uppercase font-ocra">{remainingSeconds} Seconds</span>
      </div>
      <p className="mt-6 uppercase">{isRunning ? "CTF-ONGOING!" : ""}</p>
      <div className="flex space-x-12 justify-center">
        {!isRunning && (
          <button
            className={`${"bg-red-500 uppercase"} font-ocra pl-6 rounded-lg my-4 pr-6`}
            onClick={start}
          >
            START
          </button>
        ) 
        }
      </div>
    </div>
  );
}

export default Timer;
