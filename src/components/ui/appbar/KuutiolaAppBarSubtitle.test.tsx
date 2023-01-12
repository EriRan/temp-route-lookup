import { renderWithProviders } from "test-utils";
import { LOCAL_DEVELOPMENT_VERSION } from "../../constant/TranslationKeyConstant";
import { screen } from "@testing-library/react";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import * as environmentVariable from "../../constant/EnvironmentVariable"

describe("KuutiolaAppBarSubtitle", () => {
  const getNodeEnvironmentSpy = jest.spyOn(environmentVariable, "getNodeEnvironment");

  test("Has text if Node environment is development", () => {
    getNodeEnvironmentSpy.mockReturnValue("development");
    renderWithProviders(<KuutiolaAppBarSubtitle />);
    expect(screen.getByText(LOCAL_DEVELOPMENT_VERSION)).toBeInTheDocument();
  });

  test("Does not have text if Node environment is not development", () => {
    getNodeEnvironmentSpy.mockReturnValue("production");
    renderWithProviders(<KuutiolaAppBarSubtitle />);
    expect(
      screen.queryByText(LOCAL_DEVELOPMENT_VERSION)
    ).not.toBeInTheDocument();
  });
});
