import React from "react";

import BusStop from "./stop/BusStop";
import RoadContainer from "./road/RoadContainer";
import { BusTrafficContainerProps } from "./types";
import { BusStopLocation } from "../types";

class BusTrafficContainer extends React.Component<
  BusTrafficContainerProps,
  {}
> {
  render() {
    return (
      <g className="bus-traffic-container">{this.renderTrafficNetwork()}</g>
    );
  }

  renderTrafficNetwork() {
    if (!this.props.busStopLocationMap) {
      return "Loading bus stops...";
    }
    return (
      <g className="bus-traffic-container">
        <RoadContainer
          busStopLocationMap={this.props.busStopLocationMap}
          roads={Array.from(this.props.stopMap.values()).flatMap(
            (stop) => stop.roads
          )}
        />
        {this.renderBusStops(this.props.busStopLocationMap)}
      </g>
    );
  }

  private renderBusStops(busStopLocationMap: Map<string, BusStopLocation>) {
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
  }
}

export default BusTrafficContainer;
