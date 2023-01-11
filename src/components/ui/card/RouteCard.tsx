import { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import RouteCardContent from "./RouteCardContent";
import { UiContainerProps } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 1,
    top: "10%",
  },
}));

/**
 * Openable menu that contains inputs for a route search and the results. Always in a fixed position
 */
const RouteCard: FunctionComponent<UiContainerProps> = ({ transportData }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <RouteCardContent transportData={transportData} />
    </Card>
  );
};

export default RouteCard;
