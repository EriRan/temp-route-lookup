import {
  CLOSE_LANGUAGE_DROPDOWN,
  LANGUAGE_CHANGE,
  OPEN_LANGUAGE_DROPDOWN,
} from "../../actions/language/actions";
import i18n from "../../i18n";
import { Action, LanguageStore } from "./types";

const INITIAL_STATE: LanguageStore = {
  language: "fi",
  isLanguageDropdownOpen: false,
  languageDropdownAnchorElement: null,
};

export const LANGUAGE_REDUCERS = (
  state = INITIAL_STATE,
  action: Action
): LanguageStore => {
  switch (action.type) {
    case LANGUAGE_CHANGE:
      if (!action.payload.language) {
        return state;
      }
      const newLanguage = action.payload.language.toLowerCase();
      if (newLanguage !== "fi" && newLanguage !== "en") {
        console.warn("Unsupported language: " + newLanguage);
        return state;
      }
      changeLanguage(newLanguage);
      return {
        ...state,
        language: newLanguage,
      };
    case OPEN_LANGUAGE_DROPDOWN:
      if (!action.payload.languageDropdownAnchorElement) {
        console.warn("No Anchor element provided");
        return state;
      }
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

function changeLanguage(language: string) {
  i18n.changeLanguage(language);
}
