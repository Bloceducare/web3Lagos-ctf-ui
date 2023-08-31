import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  challenge_one_contract_address,
  challenge_two_contract_address,
  rpc_url,
} from "../utils";
const NotificationContext = createContext([]);

// interface DoorUnlocked {
//   opener: string;
//   key: string;
// }

//  interface LevelUnlocked {
//   opener: string;
//   level: string;
//   timeFired: number;
// }
//  interface MasterLevelUnlocked {
//   opener: string;
//   level: string;
//   timeFired: number;
// }
//  interface PrincipalChanged {
//   culprit: string;
//   newPrincipal: string;
//   timeFired: number;
// }
//  interface ProxyRegistered {
//   registrar: string;
//   proxy: string;
//   timeFired: number;
// }
//  interface FirstSolver {
//   solver: string;
//   level: string;
//   timeFired: number;
// }
interface LogEvent {
  topics: string[];
  data: string;
}

const NotificationProvider = ({ children }: any) => {
  const [log, setLog] = useState<any>();

  useEffect(() => {
    // Fetch logs initially
    getLog();
    getLogChallenge2();

    // Fetch logs every 10 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      getLog();
      getLogChallenge2();
    }, 2000); // 2000 milliseconds = 2 seconds

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  const allEvents = [
    "0xd540835b8e983927e8e9bc0c4ac4d7e1fa864b09f18fa2446c7e65091e528424",
    "0xf3f64f015efdf3d3f9b466437a5e385e4425b32c664cfca9a59cc5c72e4c3e65",
    "0xe214d1811ecfb04649866ce13edda2fdafac62b1b0171cd0c8855d7e5b7c5c18",
    "0xd447062b36d1027d790d50655782e45a4bb9d0180e3fe10e2e9df714161ba1fc",
    "0x0b137f52fea1e6fbb53868b0eaa5b524921b21439a99e9c4404bc8d0536a85bb",
    "0x7225d1d2237ecf9ed1ec2df43a39c0c4b0d94ee9bc9bd4b3e9d50054a3aea835",
  ];

  const abi = [
    "event DoorUnlocked(string opener, string key,uint256 timeFired)",
    "event LevelUnlocked(string opener, string level,uint256 timeFired)",
    "event MasterLevelUnlocked(string opener, string level,uint256 timeFired)",
    "event PrincipalChanged(string culprit, address newPrincipal,uint256 timeFired)",
    "event ProxyRegistered(string registrar, address proxy,uint256 timeFired)",
    "event FirstSolver(string solver, string level,uint256 timeFired)",
  ];

  // contract two: event signature
  const allEvents2 = [
    "0xbd2db6e02b1d94c406c4b00c390945fb6423076577c299c0fa4e1737ef71240e",
    "0xdbbf7fe39c6b17f53a4517ade9236acce9a1ec2068637428bb05a255024ea2d6",
    "0x5bbcc0d6e19ec48cf3c7582fc5f3e5682b2b9cbdcce142fde6b04f0d81bbc0af",
  ];
  const abi2 = [
    "event Overlord(string overlord, uint256 timeFired)",
    "event Failed(string culprit, uint256 timeFired)",
    "event Passed(string winner, uint256 timeFired)",
  ];

  async function getLog() {
    const mainnetProvider = new ethers.JsonRpcProvider(rpc_url);

    const allLogs: any = await mainnetProvider.getLogs({
      address: challenge_one_contract_address,
      fromBlock: 0,
      topics: [allEvents],
    });
    //log the topic and data of each event only
    // for (let log of allLogs) {
    //   console.log(log.topics[0], log.data);
    // }

    let v: any[] = [];
    for (let i = 0; i < allLogs.length; i++) {
      v.push(returnEventParams(allLogs[i].topics[0], parse(allLogs[i])));
    }
    setLog(v);
  }

  async function getLogChallenge2() {
    const mainnetProvider = new ethers.JsonRpcProvider(rpc_url);

    const allLogs: any = await mainnetProvider.getLogs({
      address: challenge_two_contract_address,
      fromBlock: 0,
      topics: [allEvents2],
    });
    // console.log("allLogs", allLogs);
    let v: any[] = [];
    for (let i = 0; i < allLogs.length; i++) {
      v.push(returnEventParams2(allLogs[i].topics[0], parse2(allLogs[i])));
    }
    setLog((prevLogData:any) => [...prevLogData, ...v]);
  }

  function returnEventParams(eventSignature: string, e: any[]) {
    let eventDecoded: any = {};
    if (eventSignature === allEvents[0]) {
      const [opener, key, timeFired] = e;
      eventDecoded = {
        dooropener: opener,

        key: key,
        timeFired: timeFired,
      };
    }
    if (eventSignature === allEvents[1]) {
      const [opener, level, timeFired] = e;
      eventDecoded = {
        levelunlockedopener: opener,

        level: level,
        timeFired: timeFired,
      };
    }
    if (eventSignature === allEvents[2]) {
      const [opener, level, timeFired] = e;
      eventDecoded = {
        masterlevelopener: opener,

        level: level,
        timeFired: timeFired,
      };
    }
    if (eventSignature === allEvents[3]) {
      const [culprit, newPrincipal, timeFired] = e;
      eventDecoded = {
        culprit: culprit,

        newPrincipal: newPrincipal,
        timeFired: timeFired,
      };
    }
    if (eventSignature === allEvents[4]) {
      const [registrar, proxy, timeFired] = e;
      eventDecoded = {
        registrar: registrar,

        proxy: proxy,
        timeFired: timeFired,
      };
    } else if (eventSignature === allEvents[5]) {
      const [solver, level, timeFired] = e;
      eventDecoded = {
        solver: solver,

        levelsolver: level,
        timeFired: timeFired,
      };
    }
    return eventDecoded;
  }

  function returnEventParams2(eventSignature: string, e: any[]) {
    let eventDecoded: any = {};
    if (eventSignature === allEvents2[0]) {
      const [overlord, timeFired] = e;
      eventDecoded = {
        overlord: overlord,
        timeFired: timeFired,
      };
    }
    if (eventSignature === allEvents2[1]) {
      const [culprit, timeFired] = e;
      eventDecoded = {
        culpritFailed: culprit,
        timeFired: timeFired,
      };
    } else if (eventSignature === allEvents2[2]) {
      const [winner, timeFired] = e;
      eventDecoded = {
        winner: winner,
        timeFired: timeFired,
      };
    }
    return eventDecoded;
  }

  function parse(e: LogEvent | any) {
    let iface = new ethers.Interface(abi);
    return iface.parseLog(e)?.args as any;
  }

  function parse2(e: LogEvent | any) {
    let iface = new ethers.Interface(abi2);
    return iface.parseLog(e)?.args as any;
  }

  return (
    <NotificationContext.Provider value={log}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
