import { renderWithProviders } from "test-utils";
import RouteResultErrorList from "./RouteResultErrorList";
import { screen } from "@testing-library/react";

describe("RouteResultErrorList", () => {
  test("Single error", () => {
    renderWithProviders(
      <RouteResultErrorList errorMessageKeys={["ERROR_MESSAGE_ONE"]} />
    );

    expect(screen.getAllByRole("listitem").length).toBe(1);
    expect(screen.getByText(/ERROR_MESSAGE_ONE/)).toBeInTheDocument();
  });

  test("Multiple errors", () => {
    renderWithProviders(
      <RouteResultErrorList errorMessageKeys={["ERROR_MESSAGE_ONE", "ERROR_MESSAGE_TWO", "ERROR_MESSAGE_THREE"]} />
    );

    expect(screen.getAllByRole("listitem").length).toBe(3);
    expect(screen.getByText(/ERROR_MESSAGE_ONE/)).toBeInTheDocument();
    expect(screen.getByText(/ERROR_MESSAGE_TWO/)).toBeInTheDocument();
    expect(screen.getByText(/ERROR_MESSAGE_THREE/)).toBeInTheDocument();
  });

  test("No errors", () => {
    renderWithProviders(
      <RouteResultErrorList errorMessageKeys={[]} />
    );

    expect(screen.queryAllByRole("listitem").length).toBe(0);
  });
});
