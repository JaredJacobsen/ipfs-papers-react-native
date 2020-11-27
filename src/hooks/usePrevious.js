import { useRef } from "react";

export default function usePrevious(value) {
  const ref = useRef();
  const prevValue = ref.current;
  ref.current = value;
  return prevValue;
}
