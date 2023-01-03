export type Action = {
  type: string; // I would like this to have only values from actions.ts but I don't know how to do that.
  payload: Payload;
};

export type LanguageType = "fi" | "en";

export type LanguageStore = {
  language: LanguageType;
  isLanguageDropdownOpen: boolean;
  languageDropdownAnchorElement: HTMLElement | null;
};

export type Payload = {
  language?: string;
  languageDropdownAnchorElement?: HTMLElement;
};
