import { useParams } from "react-router-dom";
import Gameboard from "../../Components/Game/GameBoard/Gameboard";
import { useMakeGuess } from "../../hooks/useMakeGuess";
import Keyboard from "../../Components/Game/Keyboard/Keyboard";
import classes from "./Game.module.scss";
import { useState } from "react";
import { useGetGame } from "../../hooks/useGetGame";
import TileColorsSection from "../../Components/Game/GameDescription/TileColorsSection";
import GameOverModal from "../../Components/Game/GameOverModal/GameOverModal";
import { GameTimer } from "../../Components/Game/GameTimer/GameTimer";
import { CgChevronLeft } from "react-icons/cg";

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
  return (
    <div className={classes.game}>
      <button
        className={classes.close}
        onClick={() => (window.location.href = "/")}
      >
        <CgChevronLeft />
        Back
      </button>
      <div className={classes["game-wrapper"]}>
        <h1 className={classes["game-title"]}>Game Started!</h1>
        <div className={classes["game-info"]}>
          <p>Difficulty: {data?.difficulty}</p>
          <p>
            Language:{" "}
            {data?.isFromApi ? data?.language.toLocaleUpperCase() : "EN"}
          </p>
          {data?.timer !== undefined && data?.timer > 0 && (
            <GameTimer gameId={gameId || ""} timer={data.timer} />
          )}
        </div>

        <div className={classes["tile-section"]}>
          <TileColorsSection />
        </div>

        <div className={classes["gameboard-wrapper"]}>
          <Gameboard
            revealed={revealed}
            currentGuess={currentGuess}
            wordLength={data?.isFromApi ? data?.wordLength : 5}
            guesses={data?.guesses || []}
            maxAttempts={data?.maxAttempts || 5}
          />
        </div>

        <div className={classes["keyboard-wrapper"]}>
          <Keyboard
            isGameOver={data?.isGameOver}
            disableKeys={
              currentGuess.length !== 0 &&
              currentGuess.length === (data?.isFromApi ? data?.wordLength : 5)
            }
            setGuess={setCurrentGuess}
            onEnter={handleEnter}
            language={data?.language}
            enableEnter={
              currentGuess.length === (data?.isFromApi ? data?.wordLength : 5)
            }
            guess={currentGuess}
          />
        </div>

        {data?.isGameOver && data?.secretWord && (
          <div className={classes["gameover-modal-wrapper"]}>
            <GameOverModal secretWord={data.secretWord} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
