import { Typography, Grid } from "@material-ui/core";
import { Translation } from "react-i18next";
import { Stop } from "../../../../../data/mapper/types";
import RouteInput from "./input/RouteInput";
import { RouteInputType } from "./input/RouteInputConstant";

const RouteForm = (props: Props) => {
  return (
    <Grid container alignItems="center" direction="row">
      <Typography color="primary">
        <Translation>{(t) => t("ROUTE_SEARCH_START_POINT_HEADER")}</Translation>
      </Typography>
      <RouteInput
        type={RouteInputType.START}
        stopMap={props.stopMap}
      />

      <Typography color="primary">
        <Translation>{(t) => t("ROUTE_SEARCH_END_POINT_HEADER")}</Translation>
      </Typography>
      <RouteInput
        type={RouteInputType.DESTINATION}
        stopMap={props.stopMap}
      />
    </Grid>
  );
};

type PassedProps = {
  stopMap: Map<string, Stop>;
};
type Props = PassedProps;

export default RouteForm;
