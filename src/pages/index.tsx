import Landing from "@/components/Landing";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  
  return isClient ? <Landing /> : null;
}
