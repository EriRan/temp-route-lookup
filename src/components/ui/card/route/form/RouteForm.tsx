import { Translation } from "react-i18next";
import { Stop } from "../../../../../data/mapper/types";
import { ROUTE_SEARCH_START_POINT_HEADER, ROUTE_SEARCH_END_POINT_HEADER } from "../../../../constant/TranslationKeyConstant";
import RouteInput from "./input/RouteInput";
import { RouteInputType } from "./input/RouteInputConstant";
import { Grid, Typography } from "@mui/material";

const RouteForm = (props: Props) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography color="primary">
          <Translation>
            {(t) => t(ROUTE_SEARCH_START_POINT_HEADER)}
          </Translation>
        </Typography>
      </Grid>
      <Grid item>
        <RouteInput type={RouteInputType.START} stopMap={props.stopMap} />
      </Grid>
      <Grid item>
        <Typography color="primary">
          <Translation>{(t) => t(ROUTE_SEARCH_END_POINT_HEADER)}</Translation>
        </Typography>
      </Grid>
      <Grid item>
        <RouteInput type={RouteInputType.DESTINATION} stopMap={props.stopMap} />
      </Grid>
    </Grid>
  );
};

type PassedProps = {
  stopMap: Map<string, Stop>;
};
type Props = PassedProps;

export default RouteForm;
