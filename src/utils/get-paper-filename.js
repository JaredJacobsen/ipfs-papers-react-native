import { v4 as uuidv4 } from "uuid";

//This function must match that in https://github.com/JaredJacobsen/ipfs-papers-scrape
export default function getPaperFilename(title) {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^\w-]/g, "");

  return base + "-" + uuidv4();
}
