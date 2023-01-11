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

  if (!props.errorMessages.length) {
    return <div />;
  }
  return <List dense={true}>{createItems()}</List>;

  function createItems(): JSX.Element[] {
    return props.errorMessages.map((errorMessage, index) => {
      const message = t(errorMessage);
      return (
        <ListItem key={`input-error-${index}`}>
          <ListItemText primary={message} />
        </ListItem>
      );
    });
  }
};

type Props = {
  errorMessages: Array<string>;
};

export default RouteResultErrorList;
