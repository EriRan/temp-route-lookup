import { FunctionComponent } from "react";

import { UiContainerProps } from "../types";
import RouteCardHeader from "./header/RouteCardHeader";
import RouteForm from "./route/form/RouteForm";
import RouteResult from "./route/result/RouteResult";
import {
  Accordion,
  AccordionDetails,
  Card,
  Divider,
  Grid,
} from "@mui/material";

/**
 * Openable menu that contains inputs for a route search and the results. Always in a fixed position
 */
const RouteCard: FunctionComponent<UiContainerProps> = ({ transportData }) => {
  return (
    <Card raised={true} sx={{ position: "fixed", zIndex: 1, top: "10%" }}>
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
