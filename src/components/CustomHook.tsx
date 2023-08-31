// import { useEffect, useState } from "react";

// export function useCustomStopwatch() {
//   const initialSeconds = typeof window !== "undefined" ? parseInt(window.localStorage.getItem("timerSeconds") as any) : 11400;
//   const initialIsRunning = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("isRunning") as any) : false;

//   const [seconds, setSeconds] = useState(initialSeconds);
//   const [isRunning, setIsRunning] = useState(initialIsRunning);
//   useEffect(() => {
//     let interval:any = null;

//     if (isRunning && seconds > 0) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     } else if (seconds <= 0) {
//       clearInterval(interval);
//       setIsRunning(false);
//     } else {
//       clearInterval(interval);
//     }

//     return () => {
//       clearInterval(interval);
//       if (typeof window !== "undefined" && isRunning) {
//         localStorage.setItem("timerSeconds", seconds.toString());
//         localStorage.setItem("isRunning", JSON.stringify(isRunning));
//       }
//     };
//   }, [isRunning, seconds]);

//   const start = () => setIsRunning(true);
//   const reset = () => {
//     localStorage.removeItem("timerSeconds");
//     localStorage.removeItem("isRunning");
//     setSeconds(11400);
//     setIsRunning(false);
//   };

//   return {
//     seconds,
//     isRunning,
//     start,
//     reset,
//   };
// }
import { useEffect, useState } from "react";

export function useCustomStopwatch() {
  const initialSeconds = typeof window !== "undefined" ? parseInt(window.localStorage.getItem("timerSeconds") || "11400") : 11400;
  const initialIsRunning = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("isRunning") || "false") : false;

  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(initialIsRunning);

  const resetAppState = () => {
    localStorage.removeItem("timerSeconds");
    localStorage.removeItem("isRunning");
    setSeconds(11400);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval:any = null;

    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds <= 0) {
      clearInterval(interval);
      setIsRunning(false);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined" && isRunning) {
        localStorage.setItem("timerSeconds", seconds.toString());
        localStorage.setItem("isRunning", JSON.stringify(isRunning));
      }
    };
  }, [isRunning, seconds]);

  const start = () => setIsRunning(true);

  return {
    seconds,
    isRunning,
    start,
    resetAppState,
  };
}
