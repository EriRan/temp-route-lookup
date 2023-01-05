import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Store, AnyAction } from "redux";
import RouteResult from "./RouteResult";
import * as routeResponseCompressor from "./routeResponseCompressor";
import { CompressedRoute } from "./types";
import store, { RootState } from "../../../../reducers";
import { ResponseSegment } from "../../../../reducers/route/change/calculation/types";

// TODO: ignored tests fail because we cannot modify read only state that getState() returns. Figure out another way to do this
describe("RouteResult", () => {
  let testStore: Store<RootState, AnyAction>;

  beforeEach(() => {
    testStore = store;
  });

  test("Renders empty div when no content", () => {
    // No changes to the initial state which does not have a calculated route
    const component = renderer.create(
      <Provider store={testStore}>
        <RouteResult />
      </Provider>
    );

    expect(component).toMatchInlineSnapshot(`<div />`);
  });

  xtest("Renders empty div when calculated route has no route", () => {
    testStore.getState().route.calculatedRoute = {
      totalDuration: 1,
      route: [],
      errorMessages: [],
    };
    const component = renderer.create(
      <Provider store={testStore}>
        <RouteResult />
      </Provider>
    );

    expect(component).toMatchInlineSnapshot(`<div />`);
  });

  xtest("Renders route when calculatedRoute has content", () => {
    const route: ResponseSegment[] = [];
    route.push({
      id: "A-B",
      from: "A",
      to: "B",
      line: "Keltainen",
      duration: 1,
    });
    testStore.getState().route.calculatedRoute = {
      totalDuration: 1,
      route: route,
      errorMessages: [],
    };

    // Compression
    const compressResponseSpy = jest.spyOn(
      routeResponseCompressor,
      "compressResponse"
    );
    const compressedRoute: CompressedRoute[] = [];
    compressedRoute.push({
      from: "A",
      to: "B",
      line: "Yellow",
    });
    compressResponseSpy.mockReturnValue(compressedRoute);

    const component = renderer.create(
      <Provider store={testStore}>
        <RouteResult />
      </Provider>
    );

    expect(component).toMatchInlineSnapshot(`
<div>
  <p
    className="MuiTypography-root MuiTypography-body1"
  >
    A→B ROUTE_RESULT_WITH_LINE Yellow
  </p>
  <hr
    className="MuiDivider-root"
  />
  <p
    className="MuiTypography-root MuiTypography-body1"
  >
    ROUTE_RESULT_TOTAL_DURATION:1
  </p>
</div>
`);
  });
});
