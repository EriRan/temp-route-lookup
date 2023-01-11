import convertLanguageFlagEmoji from "./languageToFlagEmojiConverter";

describe("languageToFlagEmojiConverter", () => {
  test("USA flag conversion", () => {
    expect(convertLanguageFlagEmoji("en")).toBe("🇺🇸");
  });

  test("Finnish flag conversion", () => {
    expect(convertLanguageFlagEmoji("fi")).toBe("🇫🇮");
  });

  test("Unknown language throws an error", () => {
    let thrownError;
    const unknownLanguage = "asdad";
    try {
      convertLanguageFlagEmoji(unknownLanguage);
    } catch (error) {
      thrownError = error;
    }
    expect(thrownError).toBeDefined();
    expect((thrownError as any).message).toBe(
      "Unimplemented handling for language: " + unknownLanguage
    );
  });
});
