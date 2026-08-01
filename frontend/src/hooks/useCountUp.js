import { useState, useEffect, useRef } from "react";

export function useCountUp(target, duration = 700) {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    let raf, start;
    const from = fromRef.current;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = target;
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}