import all from "it-all";
import toBuffer from "it-to-buffer";
import { zipObject } from "lodash/fp";
import ipfs from "./ipfs";

const IPFS_PAPERS_DIR = "/ipfs-papers/";
const PAPERS_DIR = IPFS_PAPERS_DIR + "papers/";
const PDF_FILES_DIR = IPFS_PAPERS_DIR + "pdf_files/";

const papersStore = {
  async set(id, obj) {
    const stringifiedObj = JSON.stringify(obj);
    try {
      await AsyncLocalStorage.setItem(id, stringifiedObj);
    } catch (error) {
      console.log(`Failed to update ${id} in local storage: `, error);
    }
    try {
      await ipfs.files.write(PAPERS_DIR + id, stringifiedObj, {
        create: "true",
        parents: "true",
      });
    } catch (error) {
      console.log("Failed to add or update paper: ", error);
    }
  },

  async get(id) {
    try {
      await AsyncLocalStorage.getItem(id);
    } catch (error) {
      console.log("Failed to read paper: ", error);
    }
  },

  async del(id) {
    try {
      await AsyncLocalStorage.removeItem(id);
    } catch (error) {
      console.log(`Failed to remove ${id} from local storage: `, error);
    }
    try {
      await ipfs.files.rm(PAPERS_DIR + id);
    } catch (error) {
      console.log("Failed to delete paper: ", error);
    }
    try {
      await ipfs.files.rm(PDF_FILES_DIR + id + ".pdf");
    } catch (error) {
      console.log("Failed to delete PDF associated with the paper: ", error);
    }
  },

  async fetchPapersFromIpfs() {
    let papers = {};
    try {
      const files = await all(ipfs.files.ls(PAPERS_DIR));
      const filenames = files.map((f) => f.name);
      papers = await Promise.all(
        filenames.map((name) => read(PAPERS_DIR + name))
      );
      papers = zipObject(filenames, papers);
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
