export const getLanguage = (language: string) => {
  switch (language) {
    case "English":
      return "en";
    case "Spanish":
      return "es";
    case "Italian":
      return "it";
    case "German":
      return "de";
    case "French":
      return "fr";
    case "Chinese":
      return "zh";
    case "Brazilian":
      return "pt-br";
    case "Romanian":
      return "ro";
    default:
      return "en";
  }
};

export const getDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return 1;
    case "Medium-Easy":
      return 2;
    case "Medium":
      return 3;
    case "Medium-Hard":
      return 4;
    case "Hard":
      return 5;
    default:
      return 3;
  }
};
