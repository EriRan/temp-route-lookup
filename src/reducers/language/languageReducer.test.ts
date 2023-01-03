import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
  OPEN_LANGUAGE_DROPDOWN,
} from "../../actions/language/actions";
import { LANGUAGE_REDUCERS } from "./languageReducer";
import { LanguageStore } from "./types";

test("LANGUAGE_CHANGE language in lowercase", () => {
  const INITIAL_STATE: LanguageStore = {
    language: "en",
    isLanguageDropdownOpen: false,
    languageDropdownAnchorElement: null,
  };
  const action = {
    type: LANGUAGE_CHANGE,
    payload: {
      language: "fi",
    },
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
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
  const action = {
    type: LANGUAGE_CHANGE,
    payload: {
      language: "FI",
    },
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
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
  const action = {
    type: LANGUAGE_CHANGE,
    payload: {
      language: "en",
    },
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
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
  const action = {
    type: OPEN_LANGUAGE_DROPDOWN,
    payload: {
      languageDropdownAnchorElement: {} as unknown as HTMLElement, // Mock HTML element for testing purpose
    },
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
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
  const action = {
    type: OPEN_LANGUAGE_DROPDOWN,
    payload: {
      languageDropdownAnchorElement: undefined,
    },
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
  expect(newState.language).toBe("en");
  expect(newState.isLanguageDropdownOpen).toBe(
    false
  );
  expect(newState.languageDropdownAnchorElement).toBeNull();
});

test("CLOSE_LANGUAGE_DROPDOWN when open", () => {
  const INITIAL_STATE: LanguageStore = {
    language: "en",
    isLanguageDropdownOpen: true,
    languageDropdownAnchorElement: {} as unknown as HTMLElement,
  };
  const action = {
    type: CLOSE_LANGUAGE_DROPDOWN,
    payload: {},
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
  expect(newState.language).toBe("en");
  expect(newState.isLanguageDropdownOpen).toBe(
    false
  );
  expect(newState.languageDropdownAnchorElement).toBeNull();
});

test("CLOSE_LANGUAGE_DROPDOWN when already closed", () => {
  const INITIAL_STATE: LanguageStore = {
    language: "en",
    isLanguageDropdownOpen: false,
    languageDropdownAnchorElement: null,
  };
  const action = {
    type: CLOSE_LANGUAGE_DROPDOWN,
    payload: {},
  };
  const newState = LANGUAGE_REDUCERS(INITIAL_STATE, action);
  expect(newState.language).toBe("en");
  expect(newState.isLanguageDropdownOpen).toBe(
    false
  );
  expect(newState.languageDropdownAnchorElement).toBeNull();
});
