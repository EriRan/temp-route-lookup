import React from "react";
import _ from "lodash";

import BusStop from "./stop/BusStop";
import BusStopLocationProvider from "./stop/location/BusStopLocationProvider";
import "./TrafficNetworkContainer.css";
import RoadContainer from "./road/RoadContainer";

class BusTrafficContainer extends React.Component {
  render() {
    return (
      <g className="bus-traffic-container">{this.renderTrafficNetwork()}</g>
    );
  }

  renderTrafficNetwork() {
    if (!_.isUndefined(this.props.stops) && !_.isNull(this.props.stops)) {
      //Start from the first bus stop in the props and crawl to next ones through the roads.
      const busStopLocationsMap = new BusStopLocationProvider().provide(
        this.props.stops.values().next().value
      );
      return (
        <g className="bus-traffic-container">
          <RoadContainer busStopLocationMap={busStopLocationsMap} stops={this.props.stops} />
          {this.renderBusStops(busStopLocationsMap)}
        </g>
      );
    } else {
      return "Loading bus stops...";
    }
  }

  renderBusStops(busStopLocationsMap) {
    return (
      <g className="bus-stop-container">
        {Array.from(busStopLocationsMap.entries()).map((entry) => {
          return (
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