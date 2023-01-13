import { renderSvgWithProviders } from "test-utils";
import BusStop from "./BusStop";
import { screen } from "@testing-library/react";
import { BUS_STOP_TITLE } from "../../../constant/TranslationKeyConstant";
import {
  BUS_STOP_CIRCLE_RADIUS,
  SELECTED_STOP_COLOR,
  UNSELECTED_STOP_COLOR,
} from "./BusStopConstant";

describe("BusStop", () => {
  test("Not selected with initial data", () => {
    const name = "A";
    const x = 0;
    const y = 0;
    const renderResult = renderSvgWithProviders(
      <BusStop name={name} x={x} y={y} />
    );

    const circleInnerTextElement = screen.getByText(name);
    expect(circleInnerTextElement).toBeInTheDocument();
    expect(circleInnerTextElement).toHaveAttribute("x", x.toString());
    expect(circleInnerTextElement).toHaveAttribute("y", (y + 5).toString());

    expect(screen.getByText(BUS_STOP_TITLE)).toBeInTheDocument();

    expect(renderResult.container.querySelectorAll(`[cx='${x}']`).length).toBe(
      1
    );
    expect(renderResult.container.querySelectorAll(`[cy='${y}']`).length).toBe(
      1
    );
    expect(
      renderResult.container.querySelectorAll(`[r='${BUS_STOP_CIRCLE_RADIUS}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[stroke='${UNSELECTED_STOP_COLOR}']`
      ).length
    ).toBe(1);
  });

  test("Not selected with provided data", () => {
    const name = "A";
    const x = 0;
    const y = 0;
    const renderResult = renderSvgWithProviders(
      <BusStop name={name} x={x} y={y} />,
      {
        preloadedState: {
          route: {
            startStop: { name: "B" },
            destinationStop: { name: "C" },
            calculatedRoute: null,
          },
        },
      }
    );

    const circleInnerTextElement = screen.getByText(name);
    expect(circleInnerTextElement).toBeInTheDocument();
    expect(circleInnerTextElement).toHaveAttribute("x", x.toString());
    expect(circleInnerTextElement).toHaveAttribute("y", (y + 5).toString());

    expect(screen.getByText(BUS_STOP_TITLE)).toBeInTheDocument();

    expect(renderResult.container.querySelectorAll(`[cx='${x}']`).length).toBe(
      1
    );
    expect(renderResult.container.querySelectorAll(`[cy='${y}']`).length).toBe(
      1
    );
    expect(
      renderResult.container.querySelectorAll(`[r='${BUS_STOP_CIRCLE_RADIUS}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[stroke='${UNSELECTED_STOP_COLOR}']`
      ).length
    ).toBe(1);
  });

  test("Selected as start stop", () => {
    const name = "A";
    const x = 0;
    const y = 0;
    const renderResult = renderSvgWithProviders(
      <BusStop name={name} x={x} y={y} />,
      {
        preloadedState: {
          route: {
            startStop: { name: "A" },
            destinationStop: { name: "C" },
            calculatedRoute: null,
          },
        },
      }
    );

    const circleInnerTextElement = screen.getByText(name);
    expect(circleInnerTextElement).toBeInTheDocument();
    expect(circleInnerTextElement).toHaveAttribute("x", x.toString());
    expect(circleInnerTextElement).toHaveAttribute("y", (y + 5).toString());

    expect(screen.getByText(BUS_STOP_TITLE)).toBeInTheDocument();

    expect(renderResult.container.querySelectorAll(`[cx='${x}']`).length).toBe(
      1
    );
    expect(renderResult.container.querySelectorAll(`[cy='${y}']`).length).toBe(
      1
    );
    expect(
      renderResult.container.querySelectorAll(`[r='${BUS_STOP_CIRCLE_RADIUS}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[stroke='${SELECTED_STOP_COLOR}']`
      ).length
    ).toBe(1);
  });

  test("Selected as start stop", () => {
    const name = "A";
    const x = 0;
    const y = 0;
    const renderResult = renderSvgWithProviders(
      <BusStop name={name} x={x} y={y} />,
      {
        preloadedState: {
          route: {
            startStop: { name: "C" },
            destinationStop: { name: "A" },
            calculatedRoute: null,
          },
        },
      }
    );

    const circleInnerTextElement = screen.getByText(name);
    expect(circleInnerTextElement).toBeInTheDocument();
    expect(circleInnerTextElement).toHaveAttribute("x", x.toString());
    expect(circleInnerTextElement).toHaveAttribute("y", (y + 5).toString());

    expect(screen.getByText(BUS_STOP_TITLE)).toBeInTheDocument();

    expect(renderResult.container.querySelectorAll(`[cx='${x}']`).length).toBe(
      1
    );
    expect(renderResult.container.querySelectorAll(`[cy='${y}']`).length).toBe(
      1
    );
    expect(
      renderResult.container.querySelectorAll(`[r='${BUS_STOP_CIRCLE_RADIUS}']`)
        .length
    ).toBe(1);
    expect(
      renderResult.container.querySelectorAll(
        `[stroke='${SELECTED_STOP_COLOR}']`
      ).length
    ).toBe(1);
  });
});
