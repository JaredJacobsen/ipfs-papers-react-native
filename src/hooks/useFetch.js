import { isFunction } from "lodash/fp";
import { useEffect, useState } from "react";
import usePrevious from "./usePrevious";

export default function useFetch(fetch, dependencies = [], initialState = {}) {
  const [state, setState] = useState({
    isLoading: true,
    ...initialState,
  });

  const prevDependencies = usePrevious(dependencies);
  const haveDependenciesChanged =
    prevDependencies &&
    !prevDependencies.every((d, idx) => d === dependencies[idx]);
  if (haveDependenciesChanged) {
    setState((s) => ({ ...s, isLoading: true }));
  }

  useEffect(() => {
    let ignore = false;

    const makeWrappedSetState = (withFinishLoading) => {
      return (newStateOrFunction) => {
        if (!ignore) {
          setState((s) => ({
            ...s,
            isLoading: withFinishLoading ? false : s.isLoading,
            ...(isFunction(newStateOrFunction)
              ? newStateOrFunction(s)
              : newStateOrFunction),
          }));
        }
      };
    };

    fetch({ setState: makeWrappedSetState(true) });

    const wrappedSetState = makeWrappedSetState(false);
    const wrappedFetch = async () => await fetch({ setState: wrappedSetState });

    wrappedSetState({
      setState: wrappedSetState,
      refetch: wrappedFetch,
    });

    return () => {
      ignore = true;
    };
  }, dependencies);

  return { ...state, isLoading: haveDependenciesChanged || state.isLoading };
}
