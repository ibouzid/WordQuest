import { useParams } from "react-router-dom";
import Gameboard from "../../Components/Game/GameBoard/Gameboard";
import { useMakeGuess } from "../../hooks/useMakeGuess";
import Keyboard from "../../Components/Game/Keyboard/Keyboard";
import classes from "./Game.module.scss";
import { useEffect, useRef, useState } from "react";
import { useGetGame } from "../../hooks/useGetGame";
import TileColorsSection from "../../Components/Game/GameDescription/TileColorsSection";
import GameOverModal from "../../Components/Game/GameOverModal/GameOverModal";
import { GameTimer } from "../../Components/Game/GameTimer/GameTimer";
import { CgChevronLeft } from "react-icons/cg";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useQueryClient } from "@tanstack/react-query";

function Game() {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const { gameId } = useParams();
  const playerId = localStorage.getItem("playerId") || "default";
  const { data } = useGetGame(gameId || "");
  const currentPlayer = data?.players.find((p) => p.playerId === playerId);
  const { mutateAsync } = useMakeGuess();
  const queryClient = useQueryClient();
  const connectionRef = useRef<HubConnection | null>(null);
  const handleEnter = async () => {
    if (data?.mode === "Multiplayer" && connectionRef.current) {
      await connectionRef.current.invoke("MakeGuess", {
        gameId: gameId,
        guess: currentGuess,
        playerId: playerId,
      });
    } else {
      await mutateAsync({
        GameId: gameId || "",
        Guess: currentGuess,
        PlayerId: playerId,
      });
    }
    setCurrentGuess("");
  };

  useEffect(() => {
    if (data?.mode !== "Multiplayer") return;
    if (!gameId) return;
    if (connectionRef.current) return;

    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5214/gamehub")
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;
    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");
        console.log(
          "Joining game with ID:",
          gameId,
          "and player ID:",
          playerId,
        );
        connection.invoke("JoinGame", gameId, playerId);
      })
      .catch((err) => console.error("SignalR connection error:", err));

    connection.on("GameState", (game) => {
      queryClient.setQueryData(["game", game.gameId], game);
    });
    connection.on("GameUpdated", (gameState) => {
      queryClient.setQueryData(["game", gameState.gameId], gameState);
    });

    return () => {
      connection.stop();
      connectionRef.current = null;
    };
  }, [data?.mode, gameId, playerId, queryClient]);

  if (data?.mode === "Multiplayer" && data?.players.length < 2) {
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
          <h1 className={classes["game-title"]}>Waiting for player 2...</h1>
          <h2>Send them the game id:</h2>
          <p className={classes["game-id"]}>{gameId}</p>
          <h2>or full url: </h2>
          <p className={classes["game-id"]}>{window.location.href}</p>
        </div>
      </div>
    );
  }
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
        <h1 className={classes["game-title"]}>
          Game Started! Good luck, {playerId}!
        </h1>
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
        <div className={classes["gameboard-section"]}>
          {data?.players.map((player) => {
            return (
              <div className={classes["gameboard-wrapper"]}>
                <h2 className={classes["player-name"]}>{player.playerId}</h2>
                <Gameboard
                  currentGuess={
                    player.playerId === playerId ? currentGuess : ""
                  }
                  wordLength={data?.isFromApi ? data?.wordLength : 5}
                  guesses={player.guesses}
                  maxAttempts={data?.maxAttempts || 5}
                />
              </div>
            );
          })}
        </div>

        <div className={classes["keyboard-wrapper"]}>
          <Keyboard
            isGameOver={data?.isGameOver}
            disableKeys={
              (currentGuess.length !== 0 &&
                currentGuess.length ===
                  (data?.isFromApi ? data?.wordLength : 5)) ||
              currentPlayer?.guesses.length === (data?.maxAttempts || 5)
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
