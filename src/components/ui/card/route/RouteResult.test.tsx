import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Store, AnyAction } from "redux";
import { createRouteLookupStore } from "../../../../reducers";
import { RootState } from "../../../../reducers/types";
import RouteResult from "./RouteResult";
import * as routeResponseCompressor from "./routeResponseCompressor";
import { CompressedRoute } from "./types";

let store: Store<RootState, AnyAction>;

beforeEach(() => {
  store = createRouteLookupStore();
});

test("Renders empty div when no content", () => {
  store.getState().route.calculatedRoute = null;
  const component = renderer.create(
    <Provider store={store}>
      <RouteResult />
    </Provider>
  );

  expect(component).toMatchInlineSnapshot(`<div />`);
});

test("Renders empty div when calculated route has no route", () => {
  store.getState().route.calculatedRoute = {
    totalDuration: 1,
    route: new Map(),
    errorMessages: [],
  };
  const component = renderer.create(
    <Provider store={store}>
      <RouteResult />
    </Provider>
  );

  expect(component).toMatchInlineSnapshot(`<div />`);
});

test("Renders route when calculatedRoute has content", () => {
  const route = new Map();
  route.set("asd", "asd");
  store.getState().route.calculatedRoute = {
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
    <Provider store={store}>
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
