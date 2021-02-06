import { atom } from "recoil";
import ipfs from "./ipfs";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

const omniboxTextState = atom({
  key: "omniboxTextState",
  default: "",
});

const textSearchIndexState = atom({
  key: "textSearchIndexState",
  default: "",
});

// const IPFS_PAPERS_DIR = "/ipfs-papers/";
// const PAPERS_DIR = IPFS_PAPERS_DIR + "papers/";
// const PDF_FILES_DIR = IPFS_PAPERS_DIR + "pdf-files/";

// const papersState = atom({
//   key: "papersState",
//   default: {},
//   effects_UNSTABLE: [ipfsStorageEffect("papers")],
// });

// const ipfsStorageEffect = (key) => ({ onSet }) => {
//   onSet((newValue) => {
//     try {
//       AsyncLocalStorage.setItem(key, JSON.stringify(newValue));
//     } catch (error) {
//       console.log(`Failed to update ${key} in local storage: `, error)
//     }
//     try {
//       await ipfs.files.write(PAPERS_DIR + id, JSON.stringify(obj), {
//         create: "true",
//         parents: "true",
//       });
//     } catch (error) {
//       console.log("Failed to add or update paper: ", error);
//     }
//   });
// };

export { omniboxTextState, textSearchIndexState };
