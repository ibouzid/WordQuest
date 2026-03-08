import React from "react";
import classes from "./Home.module.scss";
import Select from "../../Components/Select/Select";
import { useStartGame } from "../../hooks/useStartGame";
import { getLanguage } from "../../utils/utils";
import { FaSpinner } from "react-icons/fa";

function Home() {
  const [showDifficulty, setShowDifficulty] = React.useState(false);
  const [showLanguage, setShowLanguage] = React.useState(false);
  const [showWordLength, setShowWordLength] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("3");
  const [language, setLanguage] = React.useState("English");
  const [wordLength, setWordLength] = React.useState("5");
  const { mutate, isPending, error } = useStartGame();

  const handleStart = () => {
    mutate({
      WordLength: parseInt(wordLength),
      Language: getLanguage(language),
      Difficulty: parseInt(difficulty),
    });
  };
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className={classes.mainContainer}>
      <h1>Welcome to WordQuest!</h1>
      <div className={classes.flex}>
        <Select
          label="Word Length:"
          options={[
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
          ]}
          value={wordLength}
          isOpen={showWordLength}
          onToggle={() => setShowWordLength(!showWordLength)}
          onSelect={(wordLen) => {
            setWordLength(wordLen);
            setShowWordLength(false);
          }}
        />
        <Select
          label="Difficulty:"
          options={["1", "2", "3", "4", "5"]}
          value={difficulty}
          isOpen={showDifficulty}
          onToggle={() => setShowDifficulty(!showDifficulty)}
          onSelect={(diff) => {
            setDifficulty(diff);
            setShowDifficulty(false);
          }}
        />
        <Select
          label="Language:"
          options={[
            "English",
            "Spanish",
            "French",
            "Italian",
            "German",
            "Chinese",
            "Brazilian",
            "Romanian",
          ]}
          value={language}
          isOpen={showLanguage}
          onToggle={() => setShowLanguage(!showLanguage)}
          onSelect={(lang) => {
            setLanguage(lang);
            setShowLanguage(false);
          }}
        />
      </div>
      <button className={classes.button} onClick={handleStart}>
        {isPending ? <FaSpinner className={classes.spin} /> : "Start Game"}
      </button>
    </div>
  );
}

export default Home;
