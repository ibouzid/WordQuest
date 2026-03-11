import { Link } from "react-router-dom";
import classes from "./GameOverModal.module.scss";

export default function GameOverModal({ secretWord }: { secretWord: string }) {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h1>Game Over!</h1>
        <p>The secret word was: <strong>{secretWord}</strong></p>
        <Link to="/" className={classes.newGameButton}>
          New Game
        </Link>
      </div>

    </div>
  );
}