import { renderWithProviders } from "test-utils";
import RouteCardHeader from "./RouteCardHeader";
import { screen } from "@testing-library/react";
import { ROUTE_SEARCH_HEADER } from "../../../constant/TranslationKeyConstant";

describe("RouteCardHeader", () => {
  test("Contains header and text field placeholders", () => {
    renderWithProviders(<RouteCardHeader />);

    expect(screen.getByText(ROUTE_SEARCH_HEADER)).toBeInTheDocument();
    // Accordion icon that opens the card
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
