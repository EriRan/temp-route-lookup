import React from "react";

import BusStop from "./stop/BusStop";
import "./TrafficNetworkContainer.css";
import RoadContainer from "./road/RoadContainer";
import { TrafficMapProps } from "./types";
import { BusStopLocation } from "../types";

class BusTrafficContainer extends React.Component<TrafficMapProps, {}> {
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
          stopMap={this.props.stopMap}
        />
        {this.renderBusStops(this.props.busStopLocationMap)}
      </g>
    );
  }

  private renderBusStops(busStopLocationMap: Map<string, BusStopLocation>) {
    return (
      <g className="bus-stop-container">
        {Array.from(busStopLocationMap.entries()).map((entry) => {
          return (
            //entry[0] == name of the bus stop, entry[1] == coordinates of the bus stop
            <BusStop
              key={`stop-${entry[0]}`}
              name={entry[0]}
              x={entry[1].x}
              y={entry[1].y}
            />
          );
        })}
      </g>
    );
  }
}

export default BusTrafficContainer;
