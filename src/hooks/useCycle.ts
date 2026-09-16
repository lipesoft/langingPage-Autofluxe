import { useEffect, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function useCycle(length: number, intervalMs = 4200) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, reduced]);

  return index;
}
