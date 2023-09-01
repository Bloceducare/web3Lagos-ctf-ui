import React, { useEffect, useState } from "react";
import { challenge_one_contract_address, rpc_url } from "../../utils";
import { ethers } from "ethers";

function Timer() {
  const timer = ["function CTFStart() external view returns (uint256)"];
  const duration = 11400000; // Your specified duration in milliseconds

  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);

  const getTimer = async () => {
    const mainnetProvider = await new ethers.JsonRpcProvider(rpc_url);
    const contract = await new ethers.Contract(
      challenge_one_contract_address,
      timer,
      mainnetProvider
    );
    const result = await contract.CTFStart();
    setStartTime(result.toNumber() * 1000); // Convert the contract result to milliseconds
    setIsRunning(true); // Start the timer when you get the start time
  };

  useEffect(() => {
    getTimer();
  }, []);

  // useEffect(() => {
  //   if (isRunning) {
  //     const currentTime = new Date().getTime();
  //     const remaining = startTime + duration - currentTime;

  //     if (remaining <= 0) {
  //       setIsRunning(false);
  //       setRemainingTime(0);
  //     } else {
  //       setRemainingTime(remaining);
  //       const timer = setTimeout(() => {
  //         setRemainingTime(prevRemaining => prevRemaining - 1000);
  //       }, 1000);

  //       return () => clearTimeout(timer);
  //     }
  //   }
  // }, [isRunning, startTime, duration]);

  const hours = Math.floor(remainingTime / 3600000);
  const minutes = Math.floor((remainingTime % 3600000) / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  return (
    <div className="text-white text-5xl my-6">
      <div className="font-bold">
        <span className="mx-2 uppercase font-ocra">{hours} Hours</span>:
        <span className="mx-2 uppercase font-ocra">{minutes} Minutes</span>:
        <span className="mx-2 uppercase font-ocra">{seconds} Seconds</span>
      </div>
      {/* Add your start button and "CTF-ONGOING" text here */}
    </div>
  );
}

export default Timer;

