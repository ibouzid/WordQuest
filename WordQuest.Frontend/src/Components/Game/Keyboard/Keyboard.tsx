import Key from "./Key";

const letters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Backspace"],
  ["Z", "X", "C", "V", "B", "N", "M", "Enter"],
];

export default function Keyboard({
  setGuess,
  onEnter,
  isDisabled,
}: {
  setGuess: React.Dispatch<React.SetStateAction<string>>;
  onEnter: () => void;
  isDisabled?: boolean;
}) {
  const handleKeyPress = (key: string) => {
    if (isDisabled) return;
    if (key === "Backspace") {
      setGuess((prev) => prev.slice(0, -1));
    } else if (key === "Enter") {
      onEnter();
    } else if (letters.flat().includes(key)) {
      setGuess((prev) => prev + key);
    }
  };

  return (
    <div>
      {letters.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((letter) => (
            <Key
              onClick={() => handleKeyPress(letter)}
              key={letter}
              letter={letter}
              status="unused"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
