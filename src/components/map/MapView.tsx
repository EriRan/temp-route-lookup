import * as React from "react";

import BusTrafficContainer from "./markers/BusTrafficContainer";
import { provideBusStopLocations } from "./markers/stop/location/busStopLocationProvider";
import { MAP_PADDING } from "./MapViewConstant";
import "./MapView.css";
import { MapProps } from "./types";

class MapView extends React.Component<MapProps, {}> {
  render() {
    //Start from the first bus stop in the props and crawl to next ones through the roads.
    const busStopLocations = provideBusStopLocations(
      this.props.stopMap.values().next().value
    );
    return (
      <div className="map-background">
        <svg
          width={busStopLocations.xMax + MAP_PADDING}
          height={busStopLocations.yMax + MAP_PADDING}
        >
          <BusTrafficContainer
            stopMap={this.props.stopMap}
            busStopLocationMap={busStopLocations.busStopLocationMap}
          />
        </svg>
      </div>
    );
  }

  componentDidMount() {
    window.scrollTo(500, 0);
  }
}

export default MapView;
