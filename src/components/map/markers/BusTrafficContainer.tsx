import { FunctionComponent } from "react";

import BusStop from "./stop/BusStop";
import RoadContainer from "./road/RoadContainer";
import { BusTrafficContainerProps } from "./types";
import { BusStopLocation } from "../types";

const BusTrafficContainer: FunctionComponent<BusTrafficContainerProps> = (
  props
) => {
  const renderTrafficNetwork = () => {
    if (!props.busStopLocationMap) {
      return "Loading bus stops...";
    }
    return (
      <g className="bus-traffic-container">
        <RoadContainer
          busStopLocationMap={props.busStopLocationMap}
          roads={Array.from(props.stopMap.values()).flatMap(
            (stop) => stop.roads
          )}
        />
        {renderBusStops(props.busStopLocationMap)}
      </g>
    );
  };

  const renderBusStops = (busStopLocationMap: Map<string, BusStopLocation>) => {
    return (
      <g className="bus-stop-container">
        {Array.from(busStopLocationMap.entries()).map(
          ([name, busStopLocation]) => {
            return (
              <BusStop
                key={`stop-${name}`}
                name={name}
                x={busStopLocation.x}
                y={busStopLocation.y}
              />
            );
          }
        )}
      </g>
    );
  };

  return <g className="bus-traffic-container">{renderTrafficNetwork()}</g>;
};

export default BusTrafficContainer;
