import { FunctionComponent } from "react";
import { BusStopLocation } from "../../types";
import { RoadDurationProps } from "./types";

const RoadLineDuration: FunctionComponent<RoadDurationProps> = (props) => {
  const startPointLocation = props.startPointLocation;
    const endPointLocation = props.endPointLocation;
    if (!startPointLocation) {
      console.error(
        "Start point location missing! Unable to render road duration!"
      );
      return null;
    }
    if (!endPointLocation) {
      console.error(
        "End point location missing! Unable to render road duration!"
      );
      return null;
    }
    if (startPointLocation.x === endPointLocation.x) {
      return renderTextInMiddleHorizontal(
        startPointLocation,
        endPointLocation,
        props.duration
      );
    } else if (startPointLocation.y === endPointLocation.y) {
      return renderTextInMiddleVertical(
        startPointLocation,
        endPointLocation,
        props.duration
      );
    } else {
      return renderTextInMiddleDiagonal(
        startPointLocation,
        endPointLocation,
        props.duration
      );
    }
}

const renderTextInMiddleHorizontal = (
  startPointLocation: BusStopLocation,
  endPointLocation: BusStopLocation,
  duration: number
) => {
  return (
    <text
      x={startPointLocation.x}
      y={calculateMidpoint(startPointLocation.y, endPointLocation.y) + 5}
    >
      {duration}
    </text>
  );
}

const renderTextInMiddleVertical = (
  startPointLocation: BusStopLocation,
  endPointLocation: BusStopLocation,
  duration: number
) => {
  return (
    <text
      x={calculateMidpoint(startPointLocation.x, endPointLocation.x)}
      y={startPointLocation.y + 5}
    >
      {duration}
    </text>
  );
}

const renderTextInMiddleDiagonal = (
  startPointLocation: BusStopLocation,
  endPointLocation: BusStopLocation,
  duration: number
) => {
  return (
    <text
      x={calculateMidpoint(startPointLocation.x, endPointLocation.x)}
      y={calculateMidpoint(startPointLocation.y, endPointLocation.y) + 5}
    >
      {duration}
    </text>
  );
}

const calculateMidpoint = (startValue: number, endValue: number) => {
  return (startValue + endValue) / 2;
}

export default RoadLineDuration;
