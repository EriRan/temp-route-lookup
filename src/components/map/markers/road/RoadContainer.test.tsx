import { renderSvgWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RoadContainer from "./RoadContainer";
import { Stop } from "../../../../data/mapper/types";
import { ROAD_LINE_TITLE } from "../../../constant/TranslationKeyConstant";
import { BusStopLocation } from "../../types";

describe("RoadContainer", () => {
  test("Empty content if no stopMap provided", () => {
    renderSvgWithProviders(
      <RoadContainer roads={[]} busStopLocationMap={new Map()} />
    );

    expect(screen.queryByTitle(ROAD_LINE_TITLE)).not.toBeInTheDocument();
  });

  test("Unable to render road if no content in busStopLocationMap", () => {
    const roads = [
      {
        from: { name: "A", roads: [] },
        to: { name: "B", roads: [] },
        duration: 5,
        isReverse: false,
        includesLines: ["green"],
      },
    ];
    renderSvgWithProviders(
      <RoadContainer roads={roads} busStopLocationMap={new Map()} />
    );

    expect(screen.queryByTitle(ROAD_LINE_TITLE)).not.toBeInTheDocument();
  });

  test("Render road when no calculation done", () => {
    const duration = 5;
    const roads = [
      {
        from: { name: "A", roads: [] },
        to: { name: "B", roads: [] },
        duration: duration,
        isReverse: false,
        includesLines: ["green"],
      },
    ];
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationMap.set("A", { x: 0, y: 0 });
    busStopLocationMap.set("B", { x: 50, y: 0 });
    renderSvgWithProviders(
      <RoadContainer roads={roads} busStopLocationMap={busStopLocationMap} />
    );

    // Would be better to use getByTitle here, but there is a bug in finding title when its deeper than the first layer of svg element:
    // https://github.com/testing-library/dom-testing-library/issues/974
    expect(
      screen.getByText(ROAD_LINE_TITLE, { selector: "title" })
    ).toBeInTheDocument();
    expect(screen.getByText(duration)).toBeInTheDocument();
  });

  test("Render road when calculation done for current route", () => {
    const duration = 5;
    const roads = [
      {
        from: { name: "A", roads: [] },
        to: { name: "B", roads: [] },
        duration: duration,
        isReverse: false,
        includesLines: ["green"],
      },
    ];
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationMap.set("A", { x: 0, y: 0 });
    busStopLocationMap.set("B", { x: 50, y: 0 });
    renderSvgWithProviders(
      <RoadContainer roads={roads} busStopLocationMap={busStopLocationMap} />,
      {
        preloadedState: {
          route: {
            startStop: { name: "A" },
            destinationStop: { name: "B" },
            calculatedRoute: {
              totalDuration: 5,
              route: [
                {
                  id: "A-B",
                  from: "A",
                  to: "B",
                  line: "green",
                  duration: 5,
                },
              ],
              errorMessages: [],
            },
          },
        },
      }
    );

    expect(
      screen.getByText(ROAD_LINE_TITLE, { selector: "title" })
    ).toBeInTheDocument();
    expect(screen.getByText(duration)).toBeInTheDocument();
  });

  test("Render road when calculation not done for current route", () => {
    const duration = 5;
    const roads = [
      {
        from: { name: "A", roads: [] },
        to: { name: "B", roads: [] },
        duration: duration,
        isReverse: false,
        includesLines: ["green"],
      },
    ];
    const busStopLocationMap = new Map<string, BusStopLocation>();
    busStopLocationMap.set("A", { x: 0, y: 0 });
    busStopLocationMap.set("B", { x: 50, y: 0 });
    renderSvgWithProviders(
      <RoadContainer roads={roads} busStopLocationMap={busStopLocationMap} />,
      {
        preloadedState: {
          route: {
            startStop: { name: "A" },
            destinationStop: { name: "C" },
            calculatedRoute: {
              totalDuration: 5,
              route: [
                {
                  id: "A-C",
                  from: "A",
                  to: "C",
                  line: "green",
                  duration: 5,
                },
              ],
              errorMessages: [],
            },
          },
        },
      }
    );

    expect(
      screen.getByText(ROAD_LINE_TITLE, { selector: "title" })
    ).toBeInTheDocument();
    expect(screen.queryByText(duration)).not.toBeInTheDocument();
  });
});
