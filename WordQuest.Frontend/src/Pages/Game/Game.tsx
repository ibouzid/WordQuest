import { Link, useParams } from "react-router-dom";
import Gameboard from "../../Components/Game/GameBoard/Gameboard";
import { useMakeGuess } from "../../hooks/useMakeGuess";
import Keyboard from "../../Components/Game/Keyboard/Keyboard";
import classes from "./Game.module.scss";
import { useState } from "react";
import { useGetGame } from "../../hooks/useGetGame";
import TileColorsSection from "../../Components/Game/GameDescription/TileColorsSection";

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
    setRevealed(!revealed);
    setCurrentGuess("");
  };
  const wordLen = data?.isFromApi ? data?.wordLength : 5;
  const fullGuessLength = currentGuess.length === wordLen;
  const disableKeyboard = currentGuess.length !== 0 && fullGuessLength;
  return (
    <div className={classes.game}>
      {data?.isGameOver ? (
        <h1>Game Over! Secret word: {data?.secretWord}</h1>
      ) : (
        <h1>Game Started!</h1>
      )}
      <div>
        <p>Difficulty: {data?.difficulty}</p>
        <p>
          Language:{" "}
          {data?.isFromApi ? data?.language.toLocaleUpperCase() : "EN"}
        </p>
      </div>
      <TileColorsSection />
      <Gameboard
        revealed={revealed}
        currentGuess={currentGuess}
        wordLength={data?.isFromApi ? data?.wordLength : 5}
        guesses={data?.guesses || []}
        maxAttempts={data?.maxAttempts || 5}
      />
      <Keyboard
        isGameOver={data?.isGameOver}
        disableKeys={disableKeyboard}
        setGuess={setCurrentGuess}
        onEnter={() => handleEnter()}
        language={data?.language}
        enableEnter={fullGuessLength}
      />
      {data?.isGameOver && (
        <Link to={"/"} className={classes.newGameButton}>
          New Game
        </Link>
      )}
    </div>
  );
}

export default Game;
