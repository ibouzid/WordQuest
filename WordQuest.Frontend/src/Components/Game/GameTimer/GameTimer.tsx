import { useState, useEffect } from "react";
import { useEndGame } from "../../../hooks/useEndGame";
import classes from "./GameTimer.module.scss";

export function GameTimer({
  timer,
  gameId,
}: {
  timer: number;
  gameId: string;
}) {
  const [seconds, setSeconds] = useState(timer);
  const { mutate } = useEndGame();
  useEffect(() => {
    if (seconds <= 0) {
      mutate(gameId);
    }
  }, [seconds, mutate, gameId]);
  useEffect(() => {
    if (seconds <= 0) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds, timer]);
  return <div className={`${classes["timer-display"]} ${seconds <= 15 ? classes["timer-display-warning"] : ""}`}>Time Left: {seconds}s</div>;
}
