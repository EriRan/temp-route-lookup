import { BusStopLocation, MapProps } from "../types";

export interface BusTrafficContainerProps extends MapProps {
  busStopLocationMap: Map<string, BusStopLocation>;
}
