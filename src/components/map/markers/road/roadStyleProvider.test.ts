import { provideStyles } from "./roadStyleProvider";
import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR,
} from "./RoadConstant";
import { BLUE_LINE, RED_LINE, GREEN_LINE, YELLOW_LINE } from "./KnownLines";
import { ResponseSegment } from "../../../../reducers/route/calculation/types";

describe("roadStyleProvider", () => {
  test("Road with no lines and no calculation done", () => {
    const calculationDone = false;
    const styleObjects = provideStyles(calculationDone); //No parameters because both of them can be undefined
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(1);

    const styleObject = styleObjects[0];
    expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
    expect(styleObject.color).toBe(UNUSED_ROAD_COLOR);
  });

  /**
   * Exact same results as in "Road with no lines and no calculation done"
   */
  test("Road with no lines and calculation done", () => {
    const calculationDone = true;
    const styleObjects = provideStyles(calculationDone); //No parameters because both of them can be undefined
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(1);

    const styleObject = styleObjects[0];
    expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
    expect(styleObject.color).toBe(UNUSED_ROAD_COLOR);
  });

  test("Has lines and route is not calculated", () => {
    const calculationDone = false;
    const includesLines = [RED_LINE, BLUE_LINE];

    const styleObjects = provideStyles(calculationDone, includesLines);
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(2);

    styleObjects.forEach((styleObject) => {
      expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
      expect(styleObject.color).toBeDefined();
    });
  });

  test("Has lines, route is calculated but not for current route node", () => {
    const calculationDone = true;
    const includesLines = [RED_LINE, BLUE_LINE];
    const calculatedRouteNode: ResponseSegment = {
      id: "A-B",
      from: "A",
      to: "B",
      line: GREEN_LINE,
      duration: 123,
    };

    const styleObjects = provideStyles(
      calculationDone,
      includesLines,
      calculatedRouteNode
    );
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(2);

    styleObjects.forEach((styleObject) => {
      expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
      expect(styleObject.color).toBeDefined();
    });
  });

  test("Has lines, route is calculated but not for current route node with yellow special case", () => {
    const calculationDone = true;
    const includesLines = [YELLOW_LINE];
    const calculatedRouteNode: ResponseSegment = {
      id: "A-B",
      from: "A",
      to: "B",
      line: RED_LINE,
      duration: 123,
    };

    const styleObjects = provideStyles(
      calculationDone,
      includesLines,
      calculatedRouteNode
    );
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(1);

    const styleObject = styleObjects[0];
    expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY_YELLOW);
    expect(styleObject.color).toBeDefined();
  });

  test("Has lines, route is calculated for current node", () => {
    const calculationDone = true;
    const includesLines = [RED_LINE, BLUE_LINE];
    const calculatedRouteNode: ResponseSegment = {
      id: "A-B",
      from: "A",
      to: "B",
      line: RED_LINE,
      duration: 123,
    };

    const styleObjects = provideStyles(
      calculationDone,
      includesLines,
      calculatedRouteNode
    );
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(2);

    styleObjects.forEach((styleObject) => {
      expect(styleObject.color).toBeDefined();
      if (styleObject.color === "red") {
        expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
      } else {
        expect(styleObject.opacity).toBe(UNUSED_ROAD_OPACITY);
      }
    });
  });

  /**
   * This will output a console.error because a warning is outputted about an unrecognised line. Only the lines provided in the original reittiopas.json are supported
   */
  test("Line with undefined color and no calculation done", () => {
    const calculationDone = false;
    const includesLines = ["Jokeri"];

    const styleObjects = provideStyles(calculationDone, includesLines);
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(1);

    const styleObject = styleObjects[0];
    expect(styleObject.color).toBe(UNKNOWN_ROAD_COLOR);
    expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
  });

  /**
   * Same result as above.
   *
   * This will output a console.error because a warning is outputted about an unrecognised line. Only the lines provided in the original reittiopas.json are supported
   */
  test("Line with undefined color and no calculation done", () => {
    const calculationDone = false;
    const includesLines = ["Jokeri"];

    const styleObjects = provideStyles(calculationDone, includesLines);
    expect(styleObjects).toBeInstanceOf(Array);
    expect(styleObjects).toHaveLength(1);

    const styleObject = styleObjects[0];
    expect(styleObject.color).toBe(UNKNOWN_ROAD_COLOR);
    expect(styleObject.opacity).toBe(USED_ROAD_OPACITY);
  });
});
