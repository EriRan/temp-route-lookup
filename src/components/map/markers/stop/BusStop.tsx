import { FunctionComponent } from "react";
import {
  BUS_STOP_CIRCLE_RADIUS,
  SELECTED_STOP_COLOR,
  UNSELECTED_STOP_COLOR,
} from "./BusStopConstant";
import "./BusStop.css";
import { Payload, StopState } from "../../../../reducers/route/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { stopClicked } from "../../../../reducers/route/routeReducer";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";

const BusStop: FunctionComponent<BusStopProps> = (props) => {
  const dispatch = useAppDispatch();
  const routeState = useAppSelector((state) => {
    return {
      startStop: state.route.startStop,
      destinationStop: state.route.destinationStop,
    };
  });
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
      (destinationStop &&
        currentStopName === destinationStop.name?.toUpperCase())
    ) {
      return SELECTED_STOP_COLOR;
    }
    return UNSELECTED_STOP_COLOR;
  };

  const handleClick = (
    name: string,
    stopClicked: ActionCreatorWithPayload<Payload, string>
  ) => {
    dispatch({
      type: stopClicked.type,
      payload: {
        name: name,
      },
    });
  };

  //Create style class with font from Material UI. We want the default button text style from here
  const classes = useStyles();

  return (
    <g onClick={() => handleClick(props.name, stopClicked)}>
      <circle
        cx={props.x}
        cy={props.y}
        r={BUS_STOP_CIRCLE_RADIUS.toString()}
        stroke={deduceStrokeColor(
          props.name,
          routeState.startStop,
          routeState.destinationStop
        )}
      ></circle>
      <text x={props.x} y={props.y + 5} className={classes.root}>
        {props.name}
      </text>
    </g>
  );
};

type BusStopProps = {
  name: string;
  x: number;
  y: number;
};

export default BusStop;
