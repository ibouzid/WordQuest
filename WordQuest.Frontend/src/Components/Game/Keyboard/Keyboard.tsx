import React, { useCallback, useState } from "react";
import Key from "./Key";

const letters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Backspace", "Enter"],
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
  guess: string;
};

export default function Keyboard({
  setGuess,
  onEnter,
  disableKeys,
  isGameOver = false,
  language = "English",
  enableEnter,
  guess,
}: Props) {
  const keyboard = React.useMemo(
    () => [extraKeys[language] || []].concat(letters),
    [language],
  );
  const flatKeys = React.useMemo(() => keyboard.flat(), [keyboard]);
  const [usedKeys, setUsedKeys] = useState<Set<string>>(new Set());
  const handleEnter = useCallback(
    (guess: string) => {
      setUsedKeys(prev => new Set([...prev, ...guess]));
      onEnter();
    },
    [onEnter],
  )
  const keyHandlers = React.useMemo(() => {
    const map: Record<string, () => void> = {};
    flatKeys.forEach((key) => {
      map[key] = () => {
        if (isGameOver) return;
        if (key === "Backspace") setGuess((prev) => prev.slice(0, -1));
        else if (key === "Enter" && enableEnter) handleEnter(guess);
        else if (key === "Enter" && !enableEnter) return;
        else if (disableKeys) return;
        else setGuess((prev) => prev + key);
      };
    });
    return map;
  }, [
    disableKeys,
    flatKeys,
    isGameOver,
    setGuess,
    enableEnter,
    guess,
    handleEnter,
  ]);

  return (
    <div>
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              status={usedKeys.has(letter) ? "used" : 'unused'}
              onClick={keyHandlers[letter]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
