import all from "it-all";
import toBuffer from "it-to-buffer";
import { zipObj } from "ramda";
import ipfs from "./ipfs";

const IPFS_PAPERS_DIR = "/ipfs-papers/";
const PAPERS_DIR = IPFS_PAPERS_DIR + "papers/";
const PDF_FILES_DIR = IPFS_PAPERS_DIR + "pdf_files/";

const papersStore = {
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
    console.log(id);
    try {
      await ipfs.files.rm(PAPERS_DIR + id);
    } catch (error) {
      console.log("Failed to delete paper: ", error);
    }
    try {
      await ipfs.files.rm(PDF_FILES_DIR + id);
    } catch (error) {
      console.log("Failed to delete PDF associated with the paper: ", error);
    }
  },

  async all() {
    let papers = {};
    try {
      const files = await all(ipfs.files.ls(PAPERS_DIR));
      const filenames = files.map((f) => f.name);
      papers = await Promise.all(
        filenames.map((name) => read(PAPERS_DIR + name))
      );
      papers = zipObj(filenames, papers);
    } catch (error) {
      console.log("Failed to fetch papers: ", error);
    }
    return papers;
  },
};

async function read(path) {
  const chunks = await all(ipfs.files.read(path));
  const buffer = await toBuffer(chunks.map((c) => Buffer.from(c)));
  return JSON.parse(buffer.toString());
}

export default papersStore;
