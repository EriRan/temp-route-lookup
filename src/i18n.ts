import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsJson from "../resources/translations/translations.json";

i18n.use(initReactI18next).init(translationsJson);

export function getAvailableLanguages(): string[] {
  return Object.keys(i18n.services.resourceStore.data);
}

export default i18n;
