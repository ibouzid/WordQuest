import { Link, useParams } from "react-router-dom";
import Gameboard from "../../Components/Game/GameBoard/Gameboard";
import { useMakeGuess } from "../../hooks/useMakeGuess";
import Keyboard from "../../Components/Game/Keyboard/Keyboard";
import classes from "./Game.module.scss";
import { useState } from "react";
import { useGetGame } from "../../hooks/useGetGame";

function Game() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [revealed, setRevealed] = useState(false);
  const { gameId } = useParams();
  const { data } = useGetGame(gameId || "");
  const { mutateAsync } = useMakeGuess();
  const handleEnter = async () => {
    await mutateAsync({
      GameId: gameId || "",
      Guess: currentGuess,
    });
    setRevealed(!revealed)
    setCurrentGuess("");
  };
  const wordLen = data?.isFromApi ? data?.wordLength : 5
  const disableKeyboard = currentGuess.length !== 0 && currentGuess.length === wordLen;
  return (
    <div className={classes.game}>
      {data?.isGameOver ? (
        <h1>Game Over! Secret word: {data?.secretWord}</h1>
      ) : (
        <h1>Game Started!</h1>
      )}
      <p>Difficulty: {data?.difficulty}</p>
      <p>Language: {data?.isFromApi ? data?.language.toLocaleUpperCase() : "EN"}</p>
      <Gameboard
        revealed={revealed}
        currentGuess={currentGuess}
        wordLength={data?.isFromApi ? data?.wordLength : 5}
        guesses={data?.guesses || []}
        maxAttempts={data?.maxAttempts || 5}
      />
      <Keyboard
        isGameOver={data?.isGameOver || false}
        disableKeys={disableKeyboard}
        setGuess={setCurrentGuess}
        onEnter={() => handleEnter()}
      />
      {data?.isGameOver && (
        <Link to={'/'} className={classes.newGameButton}>
          New Game
        </Link>
      )}
    </div>
  );
}

export default Game;
