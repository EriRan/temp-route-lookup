import { AnyAction } from "@reduxjs/toolkit";
import languageReducer, { closeLanguageDropdown, languageChange, openLanguageDropdown } from "./languageReducer";
import { LanguageStore } from "./types";

describe("languageReducer", () => {
  test("LANGUAGE_CHANGE language in lowercase", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: languageChange.type,
      payload: {
        language: "fi",
      },
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("fi");
    expect(newState.isLanguageDropdownOpen).toBe(
      INITIAL_STATE.isLanguageDropdownOpen
    );
    expect(newState.languageDropdownAnchorElement).toBe(
      INITIAL_STATE.languageDropdownAnchorElement
    );
  });

  test("LANGUAGE_CHANGE language in uppercase", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: languageChange.type,
      payload: {
        language: "FI",
      },
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("fi");
    expect(newState.isLanguageDropdownOpen).toBe(
      INITIAL_STATE.isLanguageDropdownOpen
    );
    expect(newState.languageDropdownAnchorElement).toBe(
      INITIAL_STATE.languageDropdownAnchorElement
    );
  });

  test("LANGUAGE_CHANGE to the existing value", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: languageChange.type,
      payload: {
        language: "en",
      },
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("en");
    expect(newState.isLanguageDropdownOpen).toBe(
      INITIAL_STATE.isLanguageDropdownOpen
    );
    expect(newState.languageDropdownAnchorElement).toBe(
      INITIAL_STATE.languageDropdownAnchorElement
    );
  });

  test("OPEN_LANGUAGE_DROPDOWN with html element in payload", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: openLanguageDropdown.type,
      payload: {
        languageDropdownAnchorElement: {} as unknown as HTMLElement, // Mock HTML element for testing purpose
      },
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("en");
    expect(newState.isLanguageDropdownOpen).toBe(true);
    expect(newState.languageDropdownAnchorElement).toBeDefined();
  });

  test("OPEN_LANGUAGE_DROPDOWN with no html element in payload", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: openLanguageDropdown.type,
      payload: {
        languageDropdownAnchorElement: undefined,
      },
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("en");
    expect(newState.isLanguageDropdownOpen).toBe(false);
    expect(newState.languageDropdownAnchorElement).toBeNull();
  });

  test("CLOSE_LANGUAGE_DROPDOWN when open", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: true,
      languageDropdownAnchorElement: {} as unknown as HTMLElement,
    };
    const action: AnyAction = {
      type: closeLanguageDropdown.type,
      payload: {},
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("en");
    expect(newState.isLanguageDropdownOpen).toBe(false);
    expect(newState.languageDropdownAnchorElement).toBeNull();
  });

  test("CLOSE_LANGUAGE_DROPDOWN when already closed", () => {
    const INITIAL_STATE: LanguageStore = {
      language: "en",
      isLanguageDropdownOpen: false,
      languageDropdownAnchorElement: null,
    };
    const action: AnyAction = {
      type: closeLanguageDropdown.type,
      payload: {},
    };
    const newState = languageReducer(INITIAL_STATE, action);
    expect(newState.language).toBe("en");
    expect(newState.isLanguageDropdownOpen).toBe(false);
    expect(newState.languageDropdownAnchorElement).toBeNull();
  });
});
