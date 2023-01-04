import React from "react";
import { connect, ConnectedProps } from "react-redux";

import RouteInput from "./RouteInput";
import { Typography, Grid } from "@material-ui/core";
import { Stop } from "../../../../data/mapper/types";
import { Translation } from "react-i18next";
import { RootState } from "../../../../reducers";
import { setDestinationStop, setStartStop } from "../../../../reducers/route/routeReducer";

class RouteForm extends React.Component<Props, {}> {
  
  render() {
    return (
      <Grid container alignItems="center" direction="row">
        <Typography color="primary"><Translation>{(t) => t('ROUTE_SEARCH_START_POINT_HEADER')}</Translation></Typography>
        <RouteInput
          label="ROUTE_SEARCH_START_POINT_PLACEHOLDER"
          autoFocus={true}
          onChangeFunction={this.props.setStartStop}
          stopMap={this.props.stopMap}
          inputStopData={this.props.startStop}
        />

        <Typography color="primary"><Translation>{(t) => t('ROUTE_SEARCH_END_POINT_HEADER')}</Translation></Typography>
        <RouteInput
          label="ROUTE_SEARCH_END_POINT_PLACEHOLDER"
          onChangeFunction={this.props.setDestinationStop}
          stopMap={this.props.stopMap}
          inputStopData={this.props.destinationStop}
        />
      </Grid>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

const mapDispatch = {
  setStartStop,
  setDestinationStop,
};

const connector = connect(mapStateToProps, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PassedProps = {
  stopMap: Map<string, Stop>;
};
type Props = PropsFromRedux & PassedProps;

export default connector(RouteForm);
