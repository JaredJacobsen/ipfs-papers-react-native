// import IPFS from "ipfs";
import IpfsHttpClient from "ipfs-http-client";
import all from "it-all";
import toBuffer from "it-to-buffer";
import { useEffect, useState } from "react";

const IPFS_PAPERS_DIR = "/ipfs-papers/";
const PAPERS_DIR = IPFS_PAPERS_DIR + "papers/";

let ipfs;
let papersStore;

export default function useIpfs() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      ipfs = IpfsHttpClient("http://localhost:5001");

      papersStore = {
        async set(id, obj) {
          try {
            await ipfs.files.write(PAPERS_DIR + id, JSON.stringify(obj), {
              create: "true",
              parents: "true",
            });
          } catch (error) {
            console.log("Failed to add or update paper: ", error);
          }
        },

        async get(id) {
          try {
            read(PAPERS_DIR + id);
          } catch (error) {
            console.log("Failed to read paper: ", error);
          }
        },

        async del(id) {
          try {
            await ipfs.files.rm(PAPERS_DIR + id);
          } catch (error) {
            console.log("Failed to delete paper: ", error);
          }
        },

        async all() {
          let papers = [];
          try {
            const files = await all(ipfs.files.ls(PAPERS_DIR));
            papers = await Promise.all(
              files.map((f) => read(PAPERS_DIR + f.name))
            );
          } catch (error) {
            console.log("Failed to fetch papers: ", error);
          }
          return papers;
        },
      };

      window.ipfs = ipfs;
      window.papersStore = papersStore;

      setLoading(false);
    })();
  }, []);

  return { loading, ipfs, papersStore };
}

async function read(path) {
  const chunks = await all(ipfs.files.read(path));
  const buffer = await toBuffer(chunks.map((c) => Buffer.from(c)));
  return JSON.parse(buffer.toString());
}
