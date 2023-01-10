import { FunctionComponent } from "react";

import { Divider, Accordion, Grid, AccordionDetails } from "@material-ui/core";

import RouteCardHeader from "./header/RouteCardHeader";
import { UiContainerProps } from "../types";
import RouteForm from "./route/form/RouteForm";
import RouteResult from "./route/result/RouteResult";

const RouteCardContent: FunctionComponent<UiContainerProps> = ({
  transportData,
}) => {
  return (
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
  );
};

export default RouteCardContent;
