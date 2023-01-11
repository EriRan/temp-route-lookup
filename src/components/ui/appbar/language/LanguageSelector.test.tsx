import { renderWithProviders } from "test-utils";
import LanguageSelector from "./LanguageSelector";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as i18n from "../../../../i18n";

describe("LanguageSelector", () => {
  const getAvailableLanguagesSpy = jest.spyOn(i18n, "getAvailableLanguages");

  test("Unopened menu displayes language flag of state language", () => {
    getAvailableLanguagesSpy.mockReturnValue(["fi", "en"]);
    renderWithProviders(<LanguageSelector />, {
      preloadedState: {
        language: {
          language: "en",
          isLanguageDropdownOpen: false,
        },
      },
    });
    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
  });

  test("Opened menu displayes languages in i18n", async () => {
    getAvailableLanguagesSpy.mockReturnValue(["fi", "en"]);
    const user = userEvent.setup();
    const renderResponse = renderWithProviders(<LanguageSelector />, {
      preloadedState: {
        language: {
          language: "en",
          isLanguageDropdownOpen: false,
        },
      },
    });

    // User clicks to open language selector popover
    const languageSelectorOpenElement = screen.getByText("🇺🇸");
    await user.click(languageSelectorOpenElement);

    // Popover should hold 2 languages with the default settings
    expect(screen.getAllByRole("menuitem").length).toBe(2);
    expect(screen.getByRole("menuitem", { name: "🇫🇮" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "🇺🇸" })).toBeInTheDocument();

    // Language should have not changed in the state but the dropdown should show up as open in the state
    expect(renderResponse.store.getState().language.language).toBe("en");
    expect(
      renderResponse.store.getState().language.isLanguageDropdownOpen
    ).toBeTruthy();

    // Language open is under popover, so it is not visible
    expect(
      screen.queryByRole("button", { name: "🇺🇸" })
    ).not.toBeInTheDocument();
  });

  test("Opened and then closed does not display the languages", async () => {
    getAvailableLanguagesSpy.mockReturnValue(["fi", "en"]);
    const user = userEvent.setup();
    renderWithProviders(<LanguageSelector />, {
      preloadedState: {
        language: {
          language: "en",
          isLanguageDropdownOpen: false,
        },
      },
    });

    // User opens and closes language selector popover
    const languageSelectorOpenElement = screen.getByText("🇺🇸");
    await user.click(languageSelectorOpenElement);
    const enLanguageSelector = screen.getByRole("menuitem", { name: "🇺🇸" });
    await user.click(enLanguageSelector);

    // Language menu is not open
    expect(screen.queryAllByRole("menuitem").length).toBe(0);
    // Language opener displays en emoji
    expect(screen.getByRole("button", { name: "🇺🇸" })).toBeInTheDocument();
  });

  test("Change language by clicking selector item", async () => {
    getAvailableLanguagesSpy.mockReturnValue(["fi", "en"]);
    const user = userEvent.setup();
    const renderResponse = renderWithProviders(<LanguageSelector />, {
      preloadedState: {
        language: {
          language: "en",
          isLanguageDropdownOpen: false,
        },
      },
    });

    const languageSelectorOpenElement = screen.getByText("🇺🇸");
    await user.click(languageSelectorOpenElement);
    const fiLanguageSelector = screen.getByRole("menuitem", { name: "🇫🇮" });
    await user.click(fiLanguageSelector);

    expect(renderResponse.store.getState().language.language).toBe("fi");
    expect(
      renderResponse.store.getState().language.isLanguageDropdownOpen
    ).toBeFalsy();
  });
});
