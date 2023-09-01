import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Timer from "./Timer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";
import { NotificationContext } from "../../context/notification";

function Landing() {
  const logs = useContext(NotificationContext);
  return (
    <>
      <ToastContainer />{" "}
      <header>
        <div>
          <Image
            src={"/web3bridge.png"}
            width={100}
            height={50}
            alt="web3bridge-logo"
          />
        </div>
      </header>
      <div>
        <section className="text-center mt-12">
          <h1 className="text-white uppercase font-ocra font-bold text-5xl">
            WEB3LAGOS CONFERENCE CTF
          </h1>
          <Timer />
          {/* <p className="font-ocra font-bold text-2xl text-white">Timer</p> */}
        </section>

        <section>
          <h3 className="font-ocra text-white font-bold uppercase text-center mb-2 text-2xl">
            Ctf update
          </h3>

          {!logs?.length && (
            <p className="text-white font-bold text-center font-ocra">
              No Data to show!!
            </p>
          )}

          <Notification />
        </section>
      </div>
    </>
  );
}

export default Landing;
