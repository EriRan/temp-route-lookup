import { renderSvgWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RoadLine from "./RoadLine";
import * as roadStyleProvider from "./roadStyleProvider";
import { LINE_GAP } from "./RoadConstant";

describe("RoadLine", () => {
  const provideStylesSpy = jest.spyOn(roadStyleProvider, "provideStyles");

  test("Single Road with no calculation done", () => {
    const duration = 10;
    const endpointXCoordinate = 50;
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
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );

    expect(screen.queryByText(duration.toString())).toBeInTheDocument();
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColor}']`).length
    ).toBe(1);
  });

  test("Single Road with calculation done", () => {
    const duration = 10;
    const endpointXCoordinate = 50;
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
        calculationDone={true}
        startPointLocation={{
          x: 0,
          y: 0,
        }}
        endPointLocation={{
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );

    expect(screen.queryByText(duration.toString())).not.toBeInTheDocument();
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColor}']`).length
    ).toBe(1);
  });

  test("Single Road with calculation done but current line included in calculated route", () => {
    const duration = 10;
    const endpointXCoordinate = 50;
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
        calculationDone={true}
        startPointLocation={{
          x: 0,
          y: 0,
        }}
        endPointLocation={{
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
        calculatedRouteNode={{
          id: "id",
          from: "A",
          to: "B",
          line: "Blue",
          duration: 1,
        }}
      />
    );

    expect(screen.queryByText(duration.toString())).toBeInTheDocument();
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColor}']`).length
    ).toBe(1);
  });

  test("Two diagonal roads", () => {
    const duration = 10;
    const endpointXCoordinate = 50;
    const endpointYCoordinate = 50;

    const mockColorOne = "green";
    const mockColorTwo = "red";
    const mockOpacity = 0.5;
    provideStylesSpy.mockReturnValue([
      {
        color: mockColorOne,
        opacity: mockOpacity,
      },
      {
        color: mockColorTwo,
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
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );

    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(2);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(2);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(2);

    // Road 1
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorOne}']`)
        .length
    ).toBe(1);

    // Road 2
    expect(renderResult.container.querySelectorAll("[x1='5']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[x2='${endpointXCoordinate + LINE_GAP}']`
      ).length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorTwo}']`)
        .length
    ).toBe(1);
  });

  test("Two vertical roads", () => {
    const duration = 10;
    const endpointXCoordinate = 0;
    const endpointYCoordinate = 50;

    const mockColorOne = "green";
    const mockColorTwo = "red";
    const mockOpacity = 0.5;
    provideStylesSpy.mockReturnValue([
      {
        color: mockColorOne,
        opacity: mockOpacity,
      },
      {
        color: mockColorTwo,
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
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );
    screen.debug();

    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(2);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(2);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(2);

    // Road 1
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorOne}']`)
        .length
    ).toBe(1);

    // Road 2
    expect(renderResult.container.querySelectorAll("[x1='5']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[x2='${endpointXCoordinate + LINE_GAP}']`
      ).length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorTwo}']`)
        .length
    ).toBe(1);
  });

  test("Two horizontal roads", () => {
    const duration = 10;
    const endpointXCoordinate = 50;
    const endpointYCoordinate = 0;

    const mockColorOne = "green";
    const mockColorTwo = "red";
    const mockOpacity = 0.5;
    provideStylesSpy.mockReturnValue([
      {
        color: mockColorOne,
        opacity: mockOpacity,
      },
      {
        color: mockColorTwo,
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
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );
    screen.debug();

    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(2);
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(2);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(2);

    // Road 1
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorOne}']`)
        .length
    ).toBe(1);

    // Road 2
    expect(renderResult.container.querySelectorAll(`[y1='${endpointYCoordinate + LINE_GAP}']`).length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[y2='${endpointYCoordinate + LINE_GAP}']`
      ).length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorTwo}']`)
        .length
    ).toBe(1);
  });

  test("Three vertical roads", () => {
    const duration = 10;
    const endpointXCoordinate = 0;
    const endpointYCoordinate = 50;

    const mockColorOne = "green";
    const mockColorTwo = "red";
    const mockColorThree = "yellow";
    const mockOpacity = 0.5;
    provideStylesSpy.mockReturnValue([
      {
        color: mockColorOne,
        opacity: mockOpacity,
      },
      {
        color: mockColorTwo,
        opacity: mockOpacity,
      },
      {
        color: mockColorThree,
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
          x: endpointXCoordinate,
          y: endpointYCoordinate,
        }}
      />
    );
    screen.debug();

    expect(
      renderResult.container.querySelectorAll(`[opacity='${mockOpacity}']`)
        .length
    ).toBe(3);
    expect(renderResult.container.querySelectorAll("[y1='0']").length).toBe(3);
    expect(
      renderResult.container.querySelectorAll(`[y2='${endpointYCoordinate}']`)
        .length
    ).toBe(3);

    // Road 1
    expect(renderResult.container.querySelectorAll("[x1='0']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[x2='${endpointXCoordinate}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorOne}']`)
        .length
    ).toBe(1);

    // Road 2
    expect(renderResult.container.querySelectorAll("[x1='5']").length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[x2='${endpointXCoordinate + LINE_GAP}']`
      ).length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorTwo}']`)
        .length
    ).toBe(1);

    // Road 3
    expect(renderResult.container.querySelectorAll(`[x1='${endpointXCoordinate + LINE_GAP * 2}']`).length).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[x2='${endpointXCoordinate + LINE_GAP * 2}']`
      ).length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(`[stroke='${mockColorThree}']`)
        .length
    ).toBe(1);
  });
});
