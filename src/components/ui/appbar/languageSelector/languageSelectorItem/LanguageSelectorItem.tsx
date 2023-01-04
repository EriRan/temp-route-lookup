import { MenuItem } from "@material-ui/core";
import { forwardRef, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { closeLanguageDropdown, languageChange } from "../../../../../reducers/language/languageReducer";
import convertLanguageFlagEmoji from "../languageToFlagEmojiConverter";

type Props = {
  language: string;
  isSelected: boolean;
};

const LanguageSelectorItem: FunctionComponent<Props> = forwardRef((props: Props, _ref) => {
  const dispatch = useDispatch();

  const handleLanguageSelectionChange = (language: string) => {
    // Don't bother making a redux call if we are selecting already selected language
    if (!props.isSelected) {
      dispatch(languageChange({language: language}));
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
