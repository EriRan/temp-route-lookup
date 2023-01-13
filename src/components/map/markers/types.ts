import { Stop } from "../../../data/mapper/types";
import { BusStopLocation, MapProps } from "../types";

export interface BusTrafficContainerProps extends MapProps {
  busStopLocationMap: Map<string, BusStopLocation>;
  stopMap: Map<string, Stop>
}
