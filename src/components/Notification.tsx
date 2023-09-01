import React, { useContext } from "react";
import { NotificationContext } from "../../context/notification";
import { formatUnixTimeInNigeria } from "../../utils";

interface LogData {
  dooropener?: string;
  key?: string;
  level?: string;
  levelsolver?: string;
  levelunlockedopener?: string;
  solver?: string;
  masterlevelopener?: string;
  culprit?: string;
  newPrincipal?: string;
  registrar?: string;
  proxy?: string;
  winner?: string;
  overlord?: string;
  culpritFailed?: string;
  timeFired: string;
}

function Notification() {
  const data: LogData[] = useContext(NotificationContext);
  if (!Array.isArray(data)) {
    return null;
  }

  const sortedData = [...data].sort((a, b) => {
    const timeA = Number(a.timeFired);
    const timeB = Number(b.timeFired);
    return timeB - timeA;
  });

  return (
    <>
      <section className="bg-gray-500 w-[30%] a rounded-lg mx-auto overflow-y-auto">
        <div className="flex justify-center">
          {!sortedData.length ? (
            <p className="text-white font-ocra" >Fetching details......</p>
          ) : (
            <>
              <div className="">
                {sortedData?.map((item, index) => {
                  let message = "";

                  if (item?.dooropener && item?.key) {
                    message = `${item.dooropener} unlocked the door  with key ${item.key}`;
                  } else if (item.solver && item.levelsolver) {
                    message = `Player ${item.solver} solved ${item.levelsolver} first`;
                  } else if (item.levelunlockedopener && item.level) {
                    message = `Player  ${item.levelunlockedopener} passed  ${item.level}`;
                  } else if (item.culprit && item.newPrincipal) {
                    message = `Culprit ${item.culprit} changed principal to ${item.newPrincipal}`;
                  } else if (item.registrar && item.proxy) {
                    message = `Registrar ${item.registrar} registered proxy ${item.proxy}`;
                  } else if (item.masterlevelopener && item.level) {
                    message = `Boom!!! ${item.masterlevelopener} unlocked  ${item.level}`;
                  } else if (item.culpritFailed && item.timeFired) {
                    message = `Player ${item.culpritFailed} failed to open the vault`;
                  } else if (item.overlord && item.timeFired ) {
                    message = `Overlord ${item.overlord}  cracked the vault first`;
                  } else if (item.winner && item.timeFired) {
                    message = `${item.winner} cracked the vault.`;
                  }
                  const formattedTime = formatUnixTimeInNigeria(
                    item.timeFired.toString()
                  );
                  return (
                    <p
                      key={index}
                      className={`text-white text-xl font-ocra ${
                        item.solver && item.levelsolver ? "font-bold" : ""
                      }`}
                    >
                      <span>{formattedTime} - </span> {message}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Notification;
