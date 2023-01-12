import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import RoadLineDuration from "./RoadLineDuration";

describe("RoadLineDuration", () => {
  test("No duration if no startpoint or endpoint", () => {
    renderWithProviders(<RoadLineDuration duration={10} />);

    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  test("No duration if no endpoint", () => {
    renderWithProviders(
      <svg>
        <RoadLineDuration
          duration={10}
          startPointLocation={{
            x: 0,
            y: 10,
          }}
        />
      </svg>
    );

    expect(screen.queryByText("10")).not.toBeInTheDocument();
  });

  test("Duration available if both start and endpoint set", () => {
    renderWithProviders(
      <svg>
        <RoadLineDuration
          duration={10}
          startPointLocation={{
            x: 0,
            y: 10,
          }}
          endPointLocation={{
            x: 0,
            y: 20,
          }}
        />
      </svg>
    );
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("Horizontal midpoint", () => {
    const renderResult = renderWithProviders(
      <svg>
        <RoadLineDuration
          duration={10}
          startPointLocation={{
            x: 0,
            y: 0,
          }}
          endPointLocation={{
            x: 0,
            y: 50,
          }}
        />
      </svg>
    );
    // I wonder if there is a better way to test this? Could not find a way where I could apply Typescript into the HTML elements and then use x and y
    expect(renderResult.container.querySelector("[x='0']")).toBeTruthy();
    expect(renderResult.container.querySelector("[y='30']")).toBeTruthy();
  });

  test("Vertical midpoint", () => {
    const renderResult = renderWithProviders(
      <svg>
        <RoadLineDuration
          duration={10}
          startPointLocation={{
            x: 0,
            y: 0,
          }}
          endPointLocation={{
            x: 50,
            y: 0,
          }}
        />
      </svg>
    );
    screen.debug();
    expect(renderResult.container.querySelector("[x='25']")).toBeTruthy();
    expect(renderResult.container.querySelector("[y='5']")).toBeTruthy();
  });

  test("Diagonal midpoint", () => {
    const renderResult = renderWithProviders(
      <svg>
        <RoadLineDuration
          duration={10}
          startPointLocation={{
            x: 0,
            y: 0,
          }}
          endPointLocation={{
            x: 50,
            y: 50,
          }}
        />
      </svg>
    );
    expect(renderResult.container.querySelector("[x='25']")).toBeTruthy();
    expect(renderResult.container.querySelector("[y='30']")).toBeTruthy();
  });
});
