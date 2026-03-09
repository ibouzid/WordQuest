import EmptyRow from "../GameRow/EmptyRow";
import GameRow from "../GameRow/GameRow";
import GuessRow from "../GameRow/GuessRow";
import { type GuessResult } from "../types";
import classes from "./Gameboard.module.scss";

type Props = {
  wordLength: number;
  maxAttempts: number;
  guesses: GuessResult[];
  currentGuess: string;
  revealed?: boolean;
};

export default function Gameboard({
  guesses,
  currentGuess,
  maxAttempts,
  wordLength
}: Props) {
  const emptyRows = maxAttempts - guesses.length - 1;
  return (
    <div className={classes.gameboard}>

      {guesses.map((g, i) => (
        <GameRow
          key={g.guess + i}
          guess={g.guess}
          feedback={g.feedback}
          animate
        />
      ))}

      {guesses.length < maxAttempts && (
        <GuessRow
          guess={currentGuess}
          wordLength={wordLength}
        />
      )}

      {Array.from({ length: emptyRows }).map((_, i) => (
        <EmptyRow key={`empty-${i}`} wordLength={wordLength} />
      ))}

    </div>
  );
}