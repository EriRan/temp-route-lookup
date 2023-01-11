import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import LanguageSelectorItem from "./LanguageSelectorItem";
import convertLanguageFlagEmoji from "../languageToFlagEmojiConverter";
import userEvent from "@testing-library/user-event";

describe("LanguageSelectorItem", () => {
  test("Language in props is displayed", () => {
    const language = "fi";
    const languageEmoji = convertLanguageFlagEmoji(language);

    renderWithProviders(
      <LanguageSelectorItem language={language} isSelected={true} />
    );

    const languageSelectorItemElement = screen.getByText(languageEmoji);
    expect(languageSelectorItemElement).toBeInTheDocument();
    expect(screen.getByRole("menuitem")).toBeInTheDocument();
    // Would be great to validate that the element is selected but did not find a way to do this. MenuItem does not support aria-selected but does it through a CSS style
    // testid seems redundant because why validate whether we passed a true boolean when we can see the fact here in the test?
  });

  test("Click unselected language", async () => {
    const user = userEvent.setup();
    const language = "en";

    const renderResult = renderWithProviders(
      <LanguageSelectorItem language={language} isSelected={false} />,
      {
        preloadedState: {
          language: {
            language: "fi",
            isLanguageDropdownOpen: true
          }
        },
      }
    );
    const languageMenuItem = screen.getByRole("menuitem");
    await user.click(languageMenuItem);

    expect(renderResult.store.getState().language.language).toBe(language);
    expect(renderResult.store.getState().language.isLanguageDropdownOpen).toBeFalsy();
  });

  test("Click selected language", async () => {
    const user = userEvent.setup();
    const language = "en";

    const renderResult = renderWithProviders(
      <LanguageSelectorItem language={language} isSelected={true} />,
      {
        preloadedState: {
          language: {
            language: "en",
            isLanguageDropdownOpen: true
          }
        },
      }
    );
    const languageMenuItem = screen.getByRole("menuitem");
    await user.click(languageMenuItem);

    expect(renderResult.store.getState().language.language).toBe(language);
    expect(renderResult.store.getState().language.isLanguageDropdownOpen).toBeFalsy();
  });
});
