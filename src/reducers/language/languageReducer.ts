import i18next from "i18next";
import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
  OPEN_LANGUAGE_DROPDOWN,
} from "../../actions/language/actions";
import { Action, LanguageStore } from "./types";

const INITIAL_STATE: LanguageStore = {
  language: "fi",
  isLanguageDropdownOpen: false,
  languageDropdownAnchorElement: null,
};

// TODO: test!
export const LANGUAGE_REDUCERS = (
  state = INITIAL_STATE,
  action: Action
): LanguageStore => {
  switch (action.type) {
    case LANGUAGE_CHANGE:
      const newLanguage = action.payload.language.toLowerCase();
      if (newLanguage !== "fi" && newLanguage !== "en") {
        return state;
      }
      i18next.changeLanguage(newLanguage);
      return {
        ...state,
        language: newLanguage,
      };
    case OPEN_LANGUAGE_DROPDOWN:
      return {
        ...state,
        isLanguageDropdownOpen: true,
        languageDropdownAnchorElement:
          action.payload.languageDropdownAnchorElement,
      };
    case CLOSE_LANGUAGE_DROPDOWN:
      return {
        ...state,
        isLanguageDropdownOpen: false,
        languageDropdownAnchorElement: null,
      };
    default:
      return state;
  }
};
