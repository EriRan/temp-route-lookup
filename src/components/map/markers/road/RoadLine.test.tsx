import { renderSvgWithProviders, renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RoadLine from "./RoadLine";
import * as roadStyleProvider from "./roadStyleProvider";

describe("RoadLine", () => {
  const provideStylesSpy = jest.spyOn(roadStyleProvider, "provideStyles");

  test("Road with no calculations done", () => {
    const duration = 10;
    const endpointYCoordinate = 50;

    const mockColor = "green";
    const mockOpacity = 0.2;
    provideStylesSpy.mockReturnValue([
      {
        color: mockColor,
        opacity: mockOpacity,
      },
    ]);
    const renderResult = renderSvgWithProviders(
      <RoadLine
        roadData={{
          from: {
            name: "",
            roads: [],
          },
          to: {
            name: "",
            roads: [],
          },
          duration: duration,
          isReverse: false,
          includesLines: [],
        }}
        calculationDone={false}
        startPointLocation={{
          x: 0,
          y: 0,
        }}
        endPointLocation={{
          x: 50,
          y: endpointYCoordinate,
        }}
      />
    );
    expect(screen.queryByText(duration.toString())).toBeInTheDocument();
    const lineElement = renderResult.container.querySelector(
      `[y2='${endpointYCoordinate}']`
    );
    expect(lineElement).toBeTruthy();
    expect(renderResult.container.querySelector("[x1='0']")).toBeTruthy();
    expect(renderResult.container.querySelector("[x2='50']")).toBeTruthy();
    expect(renderResult.container.querySelector("[y1='0']")).toBeTruthy();
    expect(renderResult.container.querySelector("[y2='50']")).toBeTruthy();
    expect(renderResult.container.querySelector(`[opacity='${mockOpacity}']`)).toBeTruthy();
    expect(renderResult.container.querySelector(`[stroke='${mockColor}']`)).toBeTruthy();
  });
});
