import { FunctionComponent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails, Card, Divider, Grid } from "@material-ui/core";
import { UiContainerProps } from "../types";
import RouteCardHeader from "./header/RouteCardHeader";
import RouteForm from "./route/form/RouteForm";
import RouteResult from "./route/result/RouteResult";

const useStyles = makeStyles(() => ({
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
      <Accordion>
        <RouteCardHeader />
        <Divider />
        <AccordionDetails>
          <Grid container direction="column">
            <RouteForm stopMap={transportData.stopMap} />
            <Divider />
            <RouteResult />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default RouteCard;
