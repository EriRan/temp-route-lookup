import { FunctionComponent } from "react";
import RoadLine from "./RoadLine";
import { BusStopLocation } from "../../types";
import { Road, Stop } from "../../../../data/mapper/types";
import { CalculationResponse } from "../../../../reducers/route/calculation/types";
import { useAppSelector } from "../../../../reducers/hooks";

const RoadContainer: FunctionComponent<Props> = (props) => {
  const calculatedRoute = useAppSelector((state) => {
    return state.route.calculatedRoute;
  });
  return (
    <g>
      {Array.from(props.stopMap.values())
        .flatMap((stop) => stop.roads)
        .filter((road) => {
          return road.isReverse === false;
        })
        .map((road) => {
          return renderRoad(road, props.busStopLocationMap, calculatedRoute);
        })}
    </g>
  );

  function renderRoad(
    road: Road,
    busStopLocationMap: Map<string, BusStopLocation>,
    calculatedRoute: CalculationResponse | null
  ) {
    const startPointLocation = busStopLocationMap.get(road.from.name);
    if (!startPointLocation) {
      console.error(
        "Start point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    const endPointLocation = busStopLocationMap.get(road.to.name);
    if (!endPointLocation) {
      console.error(
        "End point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    if (calculatedRoute && calculatedRoute.route.length > 0) {
      const calculatedRouteNode = calculatedRoute.route.find(
        (segment) => segment.id === road.from.name + "-" + road.to.name
      );
      return (
        <RoadLine
          key={`road-line-from-${road.from.name}-to-${road.to.name}`}
          roadData={road}
          startPointLocation={startPointLocation}
          endPointLocation={endPointLocation}
          calculationDone={true}
          calculatedRouteNode={calculatedRouteNode}
        />
      );
    }
    return (
      <RoadLine
        key={`road-line-from-${road.from.name}-to-${road.to.name}`}
        roadData={road}
        startPointLocation={startPointLocation}
        endPointLocation={endPointLocation}
        calculationDone={false}
      />
    );
  }
};

type Props = {
  busStopLocationMap: Map<string, BusStopLocation>;
  stopMap: Map<string, Stop>;
};

export default RoadContainer;
