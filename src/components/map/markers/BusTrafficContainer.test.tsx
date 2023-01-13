import { renderSvgWithProviders } from "test-utils";
import BusTrafficContainer from "./BusTrafficContainer";
import { screen } from "@testing-library/react";
import { BUS_STOP_TITLE, BUS_TRAFFIC_CONTAINER_LOADING, ROAD_LINE_TITLE } from "../../constant/TranslationKeyConstant";
import { BusStopLocation } from "../types";
import { Stop } from "../../../data/mapper/types";

describe("BusTrafficContainer", () => {
  test("Loading text rendered if values not provided", () => {
    renderSvgWithProviders(
      <BusTrafficContainer busStopLocationMap={new Map()} stopMap={new Map()} />
    );

    expect(screen.getByText(BUS_TRAFFIC_CONTAINER_LOADING)).toBeInTheDocument();
  });

  test("Renders two stops and one road", () => {
    const busStopOneName = "A";
    const busStopTwoName = "B";
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationMap.set(busStopOneName, { x: 0, y: 0 });
    busStopLocationMap.set(busStopTwoName, { x: 50, y: 0 });
    const stopMap = new Map<string, Stop>();
    stopMap.set(busStopOneName, {
      name: busStopOneName,
      roads: [
        {
          from: { name: busStopOneName, roads: [] },
          to: { name: busStopTwoName, roads: [] },
          duration: 5,
          isReverse: false,
          includesLines: ["green"],
        },
      ],
    });
    renderSvgWithProviders(
      <BusTrafficContainer
        busStopLocationMap={busStopLocationMap}
        stopMap={stopMap}
      />
    );

    expect(
      screen.getByText(ROAD_LINE_TITLE, { selector: "title" })
    ).toBeInTheDocument();
    expect(screen.getAllByText(BUS_STOP_TITLE).length).toBe(2);
    expect(screen.getByText(busStopOneName)).toBeInTheDocument();
    expect(screen.getByText(busStopTwoName)).toBeInTheDocument();
  });
});
