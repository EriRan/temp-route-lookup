import { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import RouteCardContent from "./RouteCardContent";
import { UiContainerProps } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    position: "fixed",
    zIndex: 1,
    top: "10%",
  },
}));

const RouteCard: FunctionComponent<UiContainerProps> = ({ transportData }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised={true}>
      <RouteCardContent transportData={transportData} />
    </Card>
  );
};

export default RouteCard;
