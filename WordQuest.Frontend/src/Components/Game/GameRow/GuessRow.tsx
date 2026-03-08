import GameTile from "../GameTile/GameTile";
import classes from "./GameRow.module.scss";

export default function GuessRow({
  guess,
  wordLength,
}: {
  guess: string;
  wordLength: number;
}) {
  const paddedGuess = guess.padEnd(wordLength, " ");
  return (
    <div className={classes.row}>
      {paddedGuess?.split("").map((letter, index) => (
        <GameTile index={index} key={index} letter={letter} />
      ))}
    </div>
  );
}
