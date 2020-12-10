// import IPFS from "ipfs";
import IpfsHttpClient from "ipfs-http-client";
import OrbitDB from "orbit-db";
import { useEffect, useState } from "react";

let papersDb;
let userDb;
window.LOG = "orbit*";

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
      // const ipfsOptions = {
      // repo: "./ipfs"
      // };
      // const ipfs = IpfsHttpClient("http://localhost:5001");
      const ipfs = IpfsHttpClient("/ip4/127.0.0.1/tcp/5001");
      console.log("ipfs id: ", ipfs.id);

      // const cid = await ipfs.add("yo, rn");
      // console.log("cid: ", cid);

      const orbitdb = await OrbitDB.createInstance(ipfs);

      userDb = await orbitdb.keyvalue("ipfs-papers-user", {
        directory: "/testing/",
      });
      await userDb.load();

      papersDb = await orbitdb.keyvalue(
        "/orbitdb/zdpuAqBsaZwqU8V3bjpXM4XqcWagncv6PAk4d9bFaU5urWsPh/ipfs-papers-papersss",
        {
          create: "true",
          // overwrite: "true",
          replicate: "true",
          accessController: {
            admin: ["*"],
            write: [
              "*",
              orbitdb.identity.id,
              "02c2d4e15be9e62acd01ce93bdd92004a890f28e8376d2b234a27805e9ed7165d6",
            ],
          },
        }
      );
      await papersDb.load();

      if (!userDb.get("papers")) {
        await userDb.set("papers", papersDb.id);
      }

      window.userDb = userDb;
      window.papersDb = papersDb;
      window.ipfs = ipfs;
      window.orbitdb = orbitdb;
      window.LOG = "orbit*";
      setLoading(false);
    })();
  }, []);

  return { loading, papersDb, userDb };
}
