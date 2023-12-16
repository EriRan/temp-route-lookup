import { forwardRef, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import {
  closeLanguageDropdown,
  languageChange,
} from "../../../../../reducers/language/languageReducer";
import convertLanguageFlagEmoji from "../languageToFlagEmojiConverter";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  language: string;
  isSelected: boolean;
};

/**
 * Single language selection. Clicking it causes language to be switched, unless that language is already in use.
 */
const LanguageSelectorItem: FunctionComponent<Props> = forwardRef((props: Props, _ref) => {

  const dispatch = useDispatch();

  const handleLanguageSelectionChange = (language: string) => {
    // Change language only if this language is not yet selected
    if (!props.isSelected) {
      dispatch(languageChange({ language: language }));
    }
    dispatch(closeLanguageDropdown());
  };

  return (
    <MenuItem
      onClick={() => handleLanguageSelectionChange(props.language)}
      selected={props.isSelected}
    >
      {convertLanguageFlagEmoji(props.language)}
    </MenuItem>
  );
});

export default LanguageSelectorItem;
