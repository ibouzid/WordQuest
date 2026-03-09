import React from "react";
import Key from "./Key";

const letters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Backspace"],
  ["Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

const extraKeys: Record<string, string[]> = {
  es: ["Ñ", "Á", "É", "Í", "Ó", "Ú", "Ü"],
  it: ["À", "È", "É", "Ì", "Ò", "Ù"],
  de: ["Ä", "Ö", "Ü", "ß"],
  fr: [
    "À",
    "Â",
    "Æ",
    "Ç",
    "É",
    "È",
    "Ê",
    "Ë",
    "Î",
    "Ï",
    "Ô",
    "Œ",
    "Ù",
    "Û",
    "Ü",
    "Ÿ",
  ],
  zh: ["ā", "á", "ǎ", "à"],
  "pt-br": ["Á", "À", "Â", "Ã", "É", "Ê", "Í", "Ó", "Ô", "Õ", "Ú", "Ç"],
  ro: ["Ă", "Â", "Î", "Ș", "Ț"],
};

type Props = {
  setGuess: React.Dispatch<React.SetStateAction<string>>;
  onEnter: () => void;
  disableKeys: boolean;
  isGameOver?: boolean;
  language?: string;
  enableEnter: boolean;
};

export default function Keyboard({
  setGuess,
  onEnter,
  disableKeys,
  isGameOver = false,
  language = "English",
  enableEnter,
}: Props) {
  const keyboard = React.useMemo(
    () => [extraKeys[language] || []].concat(letters),
    [language],
  );
  const flatKeys = React.useMemo(() => keyboard.flat(), [keyboard]);

  const keyHandlers = React.useMemo(() => {
    const map: Record<string, () => void> = {};
    flatKeys.forEach((key) => {
      map[key] = () => {
        if (isGameOver) return;
        if (key === "Backspace") setGuess((prev) => prev.slice(0, -1));
        else if (key === "Enter" && enableEnter) onEnter();
        else if (key === "Enter" && !enableEnter) return;
        else if (disableKeys) return;
        else setGuess((prev) => prev + key);
      };
    });
    return map;
  }, [disableKeys, flatKeys, isGameOver, onEnter, setGuess, enableEnter]);

  return (
    <div>
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              status="unused"
              onClick={keyHandlers[letter]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
