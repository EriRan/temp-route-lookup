import { renderWithProviders } from "test-utils";
import { APP_TITLE, LOCAL_DEVELOPMENT_VERSION } from "../../constant/TranslationKeyConstant";
import KuutiolaAppBar from "./KuutiolaAppBar";
import { screen } from "@testing-library/react";

describe("KuutiolaAppBar", () => {
  test("Contains expected elements", () => {
    renderWithProviders(<KuutiolaAppBar />);

    expect(screen.getByText(APP_TITLE)).toBeInTheDocument();
    // Default language visible in language selector
    expect(screen.getByText("🇫🇮")).toBeInTheDocument();
    // Local development version text not visible because node process env is "test"
    expect(screen.queryByText(LOCAL_DEVELOPMENT_VERSION)).not.toBeInTheDocument();
  });
});
