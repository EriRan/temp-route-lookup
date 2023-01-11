import { Button, Menu } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../../../i18n";
import { RootState } from "../../../../reducers";
import {
  closeLanguageDropdown,
  openLanguageDropdown,
} from "../../../../reducers/language/languageReducer";
import LanguageSelectorItem from "./languageSelectorItem/LanguageSelectorItem";
import convertLanguageFlagEmoji from "./languageToFlagEmojiConverter";

/**
 * Component that displays selectable languages when opened.
 *
 * Has the HTMLElement it is anchored to in its own state
 * @returns LanguageSelector component
 */
export default function LanguageSelector() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const languageState = useSelector((state: RootState) => {
    return {
      isLanguageDropdownOpen: state.language.isLanguageDropdownOpen,
      language: state.language.language,
    };
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    dispatch(openLanguageDropdown());
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(closeLanguageDropdown());
  };

  // Get all available languages and create selector items for each language
  const languageSelectorItems = Object.keys(
    i18n.services.resourceStore.data
  ).map((availableLanguage) => (
    <LanguageSelectorItem
      key={availableLanguage}
      language={availableLanguage}
      isSelected={languageState.language === availableLanguage}
    />
  ));
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={
          languageState.isLanguageDropdownOpen ? "basic-menu" : undefined
        }
        aria-haspopup="true"
        aria-expanded={languageState.isLanguageDropdownOpen ? "true" : "false"}
        onClick={handleMenuOpen}
      >
        {convertLanguageFlagEmoji(languageState.language)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={languageState.isLanguageDropdownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {languageSelectorItems}
      </Menu>
    </div>
  );
}
