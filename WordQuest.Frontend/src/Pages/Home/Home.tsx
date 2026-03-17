import React from "react";
import classes from "./Home.module.scss";
import Select from "../../Components/UI/Select/Select";
import { useStartGame } from "../../hooks/useStartGame";
import { getDifficulty, getLanguage } from "../../utils/utils";
import { FaSpinner } from "react-icons/fa";
import GameDescription from "../../Components/Game/GameDescription/GameDescription";
import RadioButtons from "../../Components/UI/RadioButtons.tsx/RadioButtons";
import TextInput from "../../Components/UI/TextInput/TextInput";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

type SettingKey =
  | "wordLength"
  | "difficulty"
  | "language"
  | "guessAttempts"
  | "timer";

function Home() {
  const [mode, setMode] = React.useState<"SinglePlayer" | "Multiplayer">(
    "SinglePlayer",
  );
  const [playerId, setPlayerId] = React.useState<string>(
    localStorage.getItem("playerId") || "",
  );
  const [gameId, setGameId] = React.useState<string>(
    localStorage.getItem("gameId") || "",
  );
  const debouncedPlayerId = useDebounce(playerId, 500);
  const debouncedGameId = useDebounce(gameId, 500);
  const [settings, setSettings] = React.useState<Record<SettingKey, string>>({
    wordLength: "5",
    difficulty: "Medium",
    language: "English",
    guessAttempts: "5",
    timer: "None",
  });

  const [openSelect, setOpenSelect] = React.useState<
    Record<SettingKey, boolean>
  >({
    wordLength: false,
    difficulty: false,
    language: false,
    guessAttempts: false,
    timer: false,
  });

  const { mutate, isPending, error } = useStartGame();
  const navigate = useNavigate();

  if (error) return <div>Error: {error.message}</div>;

  const selectConfigs: { label: string; key: SettingKey; options: string[] }[] =
    [
      {
        label: "Word Length",
        key: "wordLength",
        options: Array.from({ length: 14 }, (_, i) => (i + 2).toString()),
      },
      {
        label: "Difficulty",
        key: "difficulty",
        options: ["Easy", "Medium-Easy", "Medium", "Medium-Hard", "Hard"],
      },
      {
        label: "Language",
        key: "language",
        options: [
          "English",
          "Spanish",
          "French",
          "Italian",
          "German",
          "Chinese",
          "Brazilian",
          "Romanian",
        ],
      },
      {
        label: "Guess Attempts",
        key: "guessAttempts",
        options: ["2", "3", "4", "5", "6", "7", "8", "9", "10"],
      },
      {
        label: "Timer",
        key: "timer",
        options: ["None", "30", "60", "120", "300"],
      },
    ];

  const isStartDisabled = !playerId || isPending;

  const handleStart = () => {
    if (isStartDisabled) return;
    mutate({
      WordLength: parseInt(settings.wordLength),
      Language: getLanguage(settings.language),
      Difficulty: getDifficulty(settings.difficulty),
      GuessAttempts: parseInt(settings.guessAttempts),
      Timer: settings.timer === "None" ? 0 : parseInt(settings.timer),
      Mode: mode,
      PlayerId: debouncedPlayerId,
      GameId: mode === "Multiplayer" ? debouncedGameId : undefined,
    });
  };
  const handlePlayerIdChange = (val: string) => {
    setPlayerId(val);
    localStorage.setItem("playerId", val);
  };

  const handleGameIdChange = (val: string) => {
    setGameId(val);
    localStorage.setItem("gameId", val);
  };
  const handleJoinRoom = () => {
    navigate(`/game/${gameId}`);
  };

  return (
    <div className={classes.mainContainer}>
      <h1>Welcome to WordQuest!</h1>
      <h3 className={classes.subtitle}>
        Your ultimate word-guessing adventure awaits. Customize your game
        settings and embark on a quest to conquer the word challenges ahead!
      </h3>
      <GameDescription />
      <div className={classes.settings}>

        <TextInput
          label="Player ID:"
          value={playerId}
          onChange={handlePlayerIdChange}
        />
        <h4 className={classes.subtitle}>Game Mode: {mode}</h4>
        <RadioButtons
          inputName="mode"
          options={["SinglePlayer", "Multiplayer"]}
          onChange={(val) => setMode(val)}
        />
        {mode === "Multiplayer" && (
          <div>
            <TextInput
              label="Room ID (for Multiplayer):"
              value={gameId}
              onChange={handleGameIdChange}
            />
            <button className={classes.button} onClick={handleJoinRoom}>
              Join Room
            </button>
          </div>
        )}
        <h3>
          Select a word length, difficulty, language, number of attempts, and
          time length:
        </h3>

        <div className={classes.flex}>
          {selectConfigs.map(({ label, key, options }) => (
            <Select
              key={key}
              label={label + ":"}
              options={options}
              value={settings[key]}
              isOpen={openSelect[key]}
              onToggle={() =>
                setOpenSelect((prev) => ({
                  wordLength: false,
                  difficulty: false,
                  language: false,
                  guessAttempts: false,
                  timer: false,
                  [key]: !prev[key],
                }))
              }
              onSelect={(val) => {
                setSettings((prev) => ({ ...prev, [key]: val }));
                setOpenSelect((prev) => ({ ...prev, [key]: false }));
              }}
            />
          ))}
        </div>

        <button
          disabled={isStartDisabled}
          className={classes.button}
          onClick={handleStart}
        >
          {isPending ? <FaSpinner className={classes.spin} /> : "Create Room"}
        </button>
        {isStartDisabled && (
          <label className={classes.error}>Please Enter a Player Name</label>
        )}
      </div>
    </div>
  );
}

export default Home;
