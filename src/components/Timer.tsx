import React, { useEffect, useState } from "react";
import { challenge_one_contract_address, rpc_url } from "../../utils";
import { ethers } from "ethers";
import { useCountdown } from "../hooks/useCountdown";

function Timer() {
    // const timer = ["function CTFStart() external view returns (uint256)"];
    // const duration = 11400000; // Your specified duration in milliseconds

    const targetDate = new Date("September 1, 2023 17:15:00");

    const remainingTime = useCountdown(targetDate.getTime());

    return (
        <div className="text-white text-5xl my-6">
            <div className="font-bold">
                <span className="mx-2 uppercase font-ocra">
                    {remainingTime[1]} Hours
                </span>
                :
                <span className="mx-2 uppercase font-ocra">
                    {remainingTime[2]} Minutes
                </span>
                :
                <span className="mx-2 uppercase font-ocra">
                    {remainingTime[3]} Seconds
                </span>
            </div>
            {/* Add your start button and "CTF-ONGOING" text here */}
        </div>
    );
}

export default Timer;
