import _ from "lodash";
import { CLOSE_LANGUAGE_DROPDOWN, LANGUAGE_CHANGE, OPEN_LANGUAGE_DROPDOWN } from "./actions";

// TODO: why do we need to lowercase the language in the payload? Have them instead in lowercase in the base data

export const changeLanguage = (language: string) => {
  return {
    type: LANGUAGE_CHANGE,
    payload: {
      language: _.lowerCase(language),
    },
  };
};

export const openLanguageDropdown = (languageDropdownAnchorElement: HTMLElement) => {
  return {
    type: OPEN_LANGUAGE_DROPDOWN,
    payload: {
      languageDropdownAnchorElement: languageDropdownAnchorElement,
    },
  };
};

export const closeLanguageDropdown = () => {
  return {
    type: CLOSE_LANGUAGE_DROPDOWN,
  };
};
