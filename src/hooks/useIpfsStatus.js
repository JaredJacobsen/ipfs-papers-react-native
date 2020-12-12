import { useEffect, useState } from "react";
import ipfs from "../ipfs";

export default function useIpfsStatus() {
  const [ipfsStatus, setIpfsStatus] = useState("testing connection");

  useEffect(() => {
    (async () => {
      try {
        await ipfs.id();

        window.ipfs = ipfs;

        setIpfsStatus("ready");
      } catch (error) {
        console.log("can't reach ipfs");
        setIpfsStatus("unavailable");
      }
    })();
  }, []);

  return ipfsStatus;
}
