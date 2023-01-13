import { renderWithProviders } from "test-utils";
import MapView from "./MapView";
import { Stop } from "../../data/mapper/types";
import * as busStopLocationProvider from "./markers/stop/location/busStopLocationProvider";
import { screen } from "@testing-library/react";
import { MAP_PADDING } from "./MapViewConstant";
import { BusStopLocation } from "./types";
import { BUS_STOP_TITLE } from "../constant/TranslationKeyConstant";

describe("MapView", () => {
  const busStopLocationProviderSpy = jest.spyOn(
    busStopLocationProvider,
    "provideBusStopLocations"
  );

  test("Map borders according to xMax and yMax", () => {
    const xMax = 123;
    const yMax = 321;
    const stopMap = new Map<string, Stop>();
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationProviderSpy.mockReturnValue({
      busStopLocationMap: busStopLocationMap,
      xMax: xMax,
      yMax: yMax,
    });
    const renderResult = renderWithProviders(<MapView stopMap={stopMap} />);

    expect(
      renderResult.container.querySelectorAll(`[width='${xMax + MAP_PADDING}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[height='${yMax + MAP_PADDING}']`)
        .length
    ).toBe(1);
  });

  test("Contains bus stops", () => {
    const xMax = 123;
    const yMax = 321;
    const stopMap = new Map<string, Stop>();
    stopMap.set("A", {
      name: "A",
      roads: [
        {
          from: { name: "A", roads: [] },
          to: { name: "B", roads: [] },
          duration: 5,
          isReverse: false,
          includesLines: ["green"],
        },
      ]
    })
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationMap.set("A", { x: 0, y: 0 });
    busStopLocationMap.set("B", { x: 50, y: 0 });
    busStopLocationProviderSpy.mockReturnValue({
      busStopLocationMap: busStopLocationMap,
      xMax: xMax,
      yMax: yMax,
    });
    renderWithProviders(<MapView stopMap={stopMap} />);

    expect(screen.getAllByText(BUS_STOP_TITLE).length).toBe(2);
  })
});
