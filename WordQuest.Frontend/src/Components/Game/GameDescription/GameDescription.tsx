import classes from "./GameDescription.module.scss";
import TileColorsSection from "./TileColorsSection";

export default function GameDescription() {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>How to Play</h2>

      <p>
        Guess the hidden word in <strong>five tries or fewer</strong>.
      </p>

      <p>
        After you submit a guess, the color of
        each tile will change to show how close your guess was to the secret
        word.
      </p>

      <h3 className={classes.subtitle}>Tile Colors</h3>

      <TileColorsSection />

      <p className={classes.footer}>
        Use the clues to figure out the word before you run out of attempts.
      </p>

      <p className={classes.goodLuck}>Good luck!</p>
    </div>
  );
}