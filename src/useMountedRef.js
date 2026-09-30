import { useEffect, useRef } from "react";

/** Async forms may finish after navigation has removed them. */
export default function useMountedRef() {
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  return mounted;
}
