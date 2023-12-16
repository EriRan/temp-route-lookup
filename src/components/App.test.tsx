import { renderWithProviders } from "test-utils";
import { screen } from "@testing-library/react";
import App from "./App";

// Mocks must be done in the same scope as the import statement, so in case of React child components, in the top layer
// https://stackoverflow.com/questions/62455405/how-to-replace-a-react-component-with-a-mock-when-testing-with-jest
jest.mock("./ui/UiContainer", () => () => <div>UiContainer</div>);
jest.mock("./map/MapView", () => () => <div>MapView</div>);

describe("MapView", () => {
  test("Contains expected child components", () => {
    renderWithProviders(<App />);
    expect(screen.getByText("UiContainer")).toBeInTheDocument();
    expect(screen.getByText("MapView")).toBeInTheDocument();
  });
});
