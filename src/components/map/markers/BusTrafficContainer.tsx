import { FunctionComponent } from "react";

import BusStop from "./stop/BusStop";
import RoadContainer from "./road/RoadContainer";
import { BusTrafficContainerProps } from "./types";
import { BusStopLocation } from "../types";
import { useTranslation } from "react-i18next";
import { BUS_TRAFFIC_CONTAINER_LOADING } from "../../constant/TranslationKeyConstant";

const BusTrafficContainer: FunctionComponent<BusTrafficContainerProps> = (
  props
) => {
  const { t } = useTranslation();
  const renderTrafficNetwork = () => {
    if (!props.busStopLocationMap.size || !props.roads.length) {
      return t(BUS_TRAFFIC_CONTAINER_LOADING);
    }
    return (
      <g className="bus-traffic-container">
        
        <RoadContainer
          busStopLocationMap={props.busStopLocationMap}
          roads={props.roads}
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
