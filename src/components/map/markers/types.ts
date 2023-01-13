import { Road } from "../../../data/mapper/types";
import { BusStopLocation } from "../types";

export interface BusTrafficContainerProps {
  busStopLocationMap: Map<string, BusStopLocation>;
  roads: Road[]
}
