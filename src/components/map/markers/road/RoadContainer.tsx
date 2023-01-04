import React from "react";
import { connect, ConnectedProps } from "react-redux";
import RoadLine from "./RoadLine";
import { BusStopLocation } from "../../types";
import { Road, Stop } from "../../../../data/mapper/types";
import { CalculationResponse } from "../../../../reducers/route/change/calculation/types";
import { RootState } from "../../../../reducers";

class RoadContainer extends React.Component<Props, {}> {
  render() {
    return (
      <g>
        {Array.from(this.props.stopMap.values())
          .flatMap((stop) => stop.roads)
          .filter((road) => {
            return road.isReverse === false;
          })
          .map((road) => {
            return this.renderRoad(
              road,
              this.props.busStopLocationMap,
              this.props.calculatedRoute
            );
          })}
      </g>
    );
  }

  private renderRoad(
    road: Road,
    busStopLocationMap: Map<string, BusStopLocation>,
    calculatedRoute: CalculationResponse | null
  ) {
    const startPointLocation = busStopLocationMap.get(road.from.name);
    const endPointLocation = busStopLocationMap.get(road.to.name);
    if (!startPointLocation) {
      console.log(
        "Start point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    if (!endPointLocation) {
      console.log(
        "End point location was undefined or null. Unable to render a road from ",
        road.from.name,
        " to ",
        road.to.name
      );
      return null;
    }
    if (this.hasRouteBeenCalculated(calculatedRoute)) {
      const calculatedRouteNode = calculatedRoute!.route.get(
        road.from.name + "-" + road.to.name
      );
      return (
        <RoadLine
          key={`road-line-from-${road.from.name}-to-${road.to.name}`}
          roadData={road}
          startPointLocation={startPointLocation}
          endPointLocation={endPointLocation}
          includesLines={road.includesLines}
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
        includesLines={road.includesLines}
        calculationDone={false}
      />
    );
  }

  /**
   * Validate that the calculatedRoute contains calculated route. This should include a total duration and a route map with content
   */
  private hasRouteBeenCalculated(calculatedRoute: CalculationResponse | null) {
    return (
      calculatedRoute &&
      calculatedRoute.totalDuration &&
      calculatedRoute.totalDuration > 0 &&
      calculatedRoute.route.size
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  busStopLocationMap: Map<string, BusStopLocation>;
  stopMap: Map<string, Stop>;
};

export default connector(RoadContainer);
