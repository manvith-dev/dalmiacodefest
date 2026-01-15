import { useEffect, useState } from "react";

export function useTimer(
  storageKey: string,
  onTimeUp: (secondsLeft: number) => void
) {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const resolvedEndTime = stored ? Number(stored) : Date.now();
    setEndTime(resolvedEndTime);
  }, [storageKey]);

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
