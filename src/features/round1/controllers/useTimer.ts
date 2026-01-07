import { useEffect, useState } from "react";
import { END_TIME_KEY } from "../config/constants";

export function useTimer(onTimeUp: (secondsLeft: number) => void) {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  // Read localStorage ONLY on client
  useEffect(() => {
    const stored = localStorage.getItem(END_TIME_KEY);
    const resolvedEndTime = stored ? Number(stored) : Date.now();

    setEndTime(resolvedEndTime);
  }, []);

  useEffect(() => {
    if (endTime === null) return;

    const id = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setSecondsLeft(remaining);

      if (remaining === 0) {
        clearInterval(id);
        onTimeUp(0);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [endTime, onTimeUp]);

  return secondsLeft;
}
