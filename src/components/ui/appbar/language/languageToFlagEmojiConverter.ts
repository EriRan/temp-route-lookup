const convertLanguageFlagEmoji = (language: string) => {
  switch (language) {
    case "fi":
      return "🇫🇮";
    case "en":
      return "🇺🇸";
    default:
      throw new Error("Unimplemented handling for language: " + language);
  }
};

export default convertLanguageFlagEmoji;