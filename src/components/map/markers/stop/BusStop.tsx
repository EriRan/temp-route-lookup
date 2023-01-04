import { FunctionComponent } from "react";
import { connect, ConnectedProps } from "react-redux";

import {
  BUS_STOP_CIRCLE_RADIUS,
  SELECTED_STOP_COLOR,
  UNSELECTED_STOP_COLOR,
} from "./BusStopConstant";
import "./BusStop.css";
import { Payload, StopState } from "../../../../reducers/route/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { RootState } from "../../../../reducers";
import { stopClicked } from "../../../../reducers/route/routeReducer";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

const BusStop: FunctionComponent<Props> = (props) => {
  //Create style class with font from Material UI. We want the default button text style from here
  const classes = useStyles();
  return (
    <g onClick={() => handleClick(props.name, props.stopClicked)}>
      <circle
        cx={props.x}
        cy={props.y}
        r={BUS_STOP_CIRCLE_RADIUS.toString()}
        stroke={deduceStrokeColor(
          props.name,
          props.startStop,
          props.destinationStop
        )}
      ></circle>
      <text x={props.x} y={props.y + 5} className={classes.root}>
        {props.name}
      </text>
    </g>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.button,
    },
  })
);

const deduceStrokeColor = (
  currentStopName: string,
  startStop: StopState | null,
  destinationStop: StopState | null
) => {
  if (
    (startStop && currentStopName === startStop.name?.toUpperCase()) ||
    (destinationStop && currentStopName === destinationStop.name?.toUpperCase())
  ) {
    return SELECTED_STOP_COLOR;
  }
  return UNSELECTED_STOP_COLOR;
};

const handleClick = (
  name: string,
  stopClicked: ActionCreatorWithPayload<Payload, string>
) => {
  stopClicked({ name: name });
};

//Let's create a Typescript type from redux props and the props that are provided to this bus stop
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  name: string;
  x: number;
  y: number;
};

const mapStateToProps = (state: RootState) => {
  return {
    startStop: state.route.startStop,
    destinationStop: state.route.destinationStop,
  };
};

const connector = connect(mapStateToProps, { stopClicked });

export default connector(BusStop);
