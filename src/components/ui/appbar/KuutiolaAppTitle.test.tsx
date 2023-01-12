import { renderWithProviders } from "test-utils";
import KuutiolaAppTitle from "./KuutiolaAppTitle";
import { screen } from "@testing-library/react";
import { APP_TITLE } from "../../constant/TranslationKeyConstant";

describe("KuutiolaAppTitle", () => {
  test("Has title", () => {
    renderWithProviders(<KuutiolaAppTitle />);
    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
  });
});
