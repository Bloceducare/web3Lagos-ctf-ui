import React from "react";
import Image from "next/image";
import Timer from "./Timer";

function Landing() {
  return (
    <>
      {" "}
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
      <main>
        <section className="text-center mt-24">
          <h1 className="text-white font-bold text-5xl mb-4">WEB3LAGOS CONFERENCE CTF</h1>
          <Timer />
        </section>
      </main>
    </>
  );
}

export default Landing;
