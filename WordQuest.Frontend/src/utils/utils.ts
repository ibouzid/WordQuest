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
