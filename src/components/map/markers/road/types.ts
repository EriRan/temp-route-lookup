import { Road } from "../../../../data/mapper/types";
import { ResponseSegment } from "../../../../reducers/route/calculation/types";
import { BusStopLocation } from "../../types";

export type RoadLineProps = {
  roadData: Road;
  calculationDone: boolean;
  calculatedRouteNode?: ResponseSegment;
  startPointLocation: BusStopLocation;
  endPointLocation: BusStopLocation;
  includesLines?: Array<String>;
};

export type RoadDurationProps = {
  startPointLocation?: BusStopLocation;
  endPointLocation?: BusStopLocation;
  duration: number;
};

export type RoadStyle = {
  color: string;
  opacity: number;
};
