import React from "react";
import classes from "./Home.module.scss";
import Select from "../../Components/Select/Select";
import { useStartGame } from "../../hooks/useStartGame";
import { getDifficulty, getLanguage } from "../../utils/utils";
import { FaSpinner } from "react-icons/fa";
import GameDescription from "../../Components/Game/GameDescription/GameDescription";

type SettingKey =
  | "wordLength"
  | "difficulty"
  | "language"
  | "guessAttempts"
  | "timer";

function Home() {
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

  const handleStart = () => {
    mutate({
      WordLength: parseInt(settings.wordLength),
      Language: getLanguage(settings.language),
      Difficulty: getDifficulty(settings.difficulty),
      GuessAttempts: parseInt(settings.guessAttempts),
      Timer: settings.timer === "None" ? 0 : parseInt(settings.timer),
    });
  };

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

  return (
    <div className={classes.mainContainer}>
      <h1>Welcome to WordQuest!</h1>
      <h3>Select a word length, difficulty, language, number of attempts, and time length:</h3>

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

      <GameDescription />

      <button className={classes.button} onClick={handleStart}>
        {isPending ? <FaSpinner className={classes.spin} /> : "Start Game"}
      </button>
    </div>
  );
}

export default Home;
