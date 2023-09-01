// import abi from "../abi/ctf.json";
export const challenge_one_contract_address: string =
  "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";
export const challenge_two_contract_address: string =
  "0xA15BB66138824a1c7167f5E85b957d04Dd34E468";
export const rpc_url: string =
  "https://polygon-mainnet.infura.io/v3/8d52028baf5c4cb298a34795142c6885";

// export const doorUnlocked =
//   "0xe8e61146ba83d601498e943a7f5a296b6c9f7607fb36b4ec37511a88ea97b006";
// export const levelUnlocked =
//   "0xcac691d63a017362514b39ff15462f9a248fd48a458233c69f49ccc473dde705";
// export const masterLevelUnlocked =
//   "0xc5e26c1a56d3462ee5e4ecf6702acd3102e3fd7c075b877fabd217ec7e1c451b";
// export const principalChanged =
//   "0x0bed265d46755e427fead691a68512d1118c33b21056d8a32218714766ff7ff7";
// export const proxyRegistered =
//   "0x725e5528c589f2ce0bfb0bfe787d2c1ffe213bf0cae7d100d04eb4268ec6d986";
// export const firstSolver =
//   "0x015787591966740666a19ecc26af07c3a61a5201d90ac2e06b52cb218b03f70a";

import { ethers } from "ethers";

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

export interface DoorUnlocked {
  opener: string;
  key: string;
}

export interface LevelUnlocked {
  opener: string;
  level: string;
  timeFired: number;
}
export interface MasterLevelUnlocked {
  opener: string;
  level: string;
  timeFired: number;
}
export interface PrincipalChanged {
  culprit: string;
  newPrincipal: string;
  timeFired: number;
}
export interface ProxyRegistered {
  registrar: string;
  proxy: string;
  timeFired: number;
}
export interface FirstSolver {
  solver: string;
  level: string;
  timeFired: number;
}

export async function getLog() {
  const mainnetProvider = new ethers.JsonRpcProvider(rpc_url);
  const contractAddress = "0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35";

  const allLogs: any = await mainnetProvider.getLogs({
    address: contractAddress,
    fromBlock: 0,
    topics: [allEvents],
  });
  //log the topic and data of each event only
  for (let log of allLogs) {
    console.log(log.topics[0], log.data);
  }

  let v: any[] = [];
  for (let i = 0; i < allLogs.length; i++) {
    v.push(returnEventParams(allLogs[i].topics[0], parse(allLogs[i])));
  }

  console.log(v);
}

export interface LogEvent {
  topics: string[];
  data: string;
}

function returnEventParams(eventSignature: string, e: any[]) {
  let eventDecoded: any = {};
  if (eventSignature === allEvents[0]) {
    const [opener, key, timeFired] = e;
    eventDecoded = {
      opener: opener,

      key: key,
      timeFired: timeFired,
    };
  }
  if (eventSignature === allEvents[1]) {
    const [opener, level, timeFired] = e;
    eventDecoded = {
      opener: opener,

      level: level,
      timeFired: timeFired,
    };
  }
  if (eventSignature === allEvents[2]) {
    const [opener, level, timeFired] = e;
    eventDecoded = {
      opener: opener,

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

      level: level,
      timeFired: timeFired,
    };
  }
  return eventDecoded;
}

function parse(e: LogEvent | any) {
  let iface = new ethers.Interface(abi);
  return iface.parseLog(e)?.args as any;
}

//write a function to check the log.topics[0] of each event and destructure it as appropriate

export function formatUnixTimeInNigeria(timestamp: any) {
  const date = new Date(timestamp * 1000);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Lagos", // Nigeria's time zone (West Africa Time)
    hour12: false,
  } as Intl.DateTimeFormatOptions; // Cast options to the correct type

  const formatter = new Intl.DateTimeFormat("en-NG", options);

  return formatter.format(date);
}
