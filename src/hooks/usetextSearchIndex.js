import { useRecoilState } from "recoil";
import { textSearchIndexState } from "../atoms";

export default function useTextSearchIndex(query) {
  const [textSearchIndex, setTextSearchIndex] = useRecoilState(
    textSearchIndexState
  );

  //This hook is intended to be used to rebuild the lunr index after papers have been added or removed
}
