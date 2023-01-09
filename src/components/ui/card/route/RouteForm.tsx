import RouteInput from "./RouteInput";
import { Typography, Grid } from "@material-ui/core";
import { Stop } from "../../../../data/mapper/types";
import { Translation } from "react-i18next";
import {
  setDestinationStop,
  setStartStop,
} from "../../../../reducers/route/routeReducer";
import { useAppSelector } from "../../../../reducers/hooks";

const RouteForm = (props: Props) => {
  const startStop = useAppSelector((state) => state.route.startStop);
  const destinationStop = useAppSelector((state) => state.route.destinationStop);

  return (
    <Grid container alignItems="center" direction="row">
      <Typography color="primary">
        <Translation>{(t) => t("ROUTE_SEARCH_START_POINT_HEADER")}</Translation>
      </Typography>
      <RouteInput
        label="ROUTE_SEARCH_START_POINT_PLACEHOLDER"
        autoFocus={true}
        onChangeFunction={setStartStop}
        stopMap={props.stopMap}
        inputStopData={startStop}
      />

      <Typography color="primary">
        <Translation>{(t) => t("ROUTE_SEARCH_END_POINT_HEADER")}</Translation>
      </Typography>
      <RouteInput
        label="ROUTE_SEARCH_END_POINT_PLACEHOLDER"
        onChangeFunction={setDestinationStop}
        stopMap={props.stopMap}
        inputStopData={destinationStop}
      />
    </Grid>
  );
};

type PassedProps = {
  stopMap: Map<string, Stop>;
};
type Props = PassedProps;

export default RouteForm;
