import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useTranslation } from "react-i18next";

/**
 * Render a list of errors encountered during route calculation
 * @param props
 * @returns
 */
const RouteResultErrorList = (props: Props) => {
  const { t } = useTranslation();

  if (!props.errorMessageKeys.length) {
    return <div />;
  }
  return <List dense={true}>{createItems()}</List>;

  function createItems(): JSX.Element[] {
    return props.errorMessageKeys.map((errorMessageKey, index) => {
      const translatedMessage = t(errorMessageKey);
      return (
        <ListItem key={`${index}-${errorMessageKey}`}>
          <ListItemText primary={translatedMessage} />
        </ListItem>
      );
    });
  }
};

type Props = {
  errorMessageKeys: Array<string>;
};

export default RouteResultErrorList;
