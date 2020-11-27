import IPFS from "ipfs";
import OrbitDB from "orbit-db";
import { useEffect, useState } from "react";

let papersDb;
let userDb;

export function usePapersDb() {
  return papersDb;
}

export function useUserDb() {
  return userDb;
}

export function useOrbit() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ipfsOptions = {
        // repo: "./ipfs"
      };
      const ipfs = await IPFS.create(ipfsOptions);

      const orbitdb = await OrbitDB.createInstance(ipfs);

      // const defaultOptions = {
      //   accessController: { write: [orbitdb.identity.id] },
      // };

      papersDb = await orbitdb.keyvalue("papers");
      await papersDb.load();

      userDb = await orbitdb.keyvalue("user");
      await userDb.load();

      await userDb.set("papers", papersDb.id);

      window.userDb = userDb;
      window.papersDb = papersDb;
      setLoading(false);
    })();
  }, []);

  return { loading, papersDb, userDb };
}
