import {
  UNUSED_ROAD_OPACITY,
  UNUSED_ROAD_OPACITY_YELLOW,
  USED_ROAD_OPACITY,
  UNUSED_ROAD_COLOR,
  UNKNOWN_ROAD_COLOR,
} from "./RoadConstant";
import { BLUE_LINE, GREEN_LINE, RED_LINE, YELLOW_LINE } from "./KnownLines";
import { ResponseSegment } from "../../../../reducers/route/change/calculation/types";
import { RoadStyle } from "./types";

/**
 * Deduces styles for roads. The more lines the road is included in, the more style objects will be provided.
 *
 * return Array<StyleObject>
 *
 * StyleObject : {
 *  Integer opacity
 *  String color
 * }
 */
export function provideStyles(
  calculationDone: boolean,
  includesLines?: string[],
  calculatedRouteNode?: ResponseSegment
): Array<RoadStyle> {
  if (!Array.isArray(includesLines)) {
    console.error(
      "Received non array for included lines. Returning an unused road!"
    );
    return new Array(createResponse(UNUSED_ROAD_COLOR, UNUSED_ROAD_OPACITY));
  }
  if (includesLines.length === 0) {
    return new Array(createResponse(UNUSED_ROAD_COLOR, UNUSED_ROAD_OPACITY));
  }
  return deduceFromLines(calculationDone, includesLines, calculatedRouteNode);

  function deduceFromLines(
    calculationDone: boolean,
    includesLines: string[],
    calculatedRouteNode?: ResponseSegment
  ) {
    const arrayResponse = new Array<RoadStyle>();
    includesLines.forEach((lineName) => {
      arrayResponse.push(
        deduceOneLineStyle(calculationDone, lineName, calculatedRouteNode)
      );
    });
    return arrayResponse;
  }

  function deduceOneLineStyle(
    calculationDone: boolean,
    lineName: string,
    calculatedRouteNode?: ResponseSegment
  ) {
    return returnColorDependingOnLine(
      lineName,
      deduceCorrectOpacity(calculationDone, lineName, calculatedRouteNode)
    );
  }
  function returnColorDependingOnLine(lineName: string, opacity: number) {
    switch (lineName) {
      case YELLOW_LINE:
        return createResponse("yellow", opacity);
      case RED_LINE:
        return createResponse("red", opacity);
      case GREEN_LINE:
        return createResponse("green", opacity);
      case BLUE_LINE:
        return createResponse("blue", opacity);
      default:
        console.log(
          "Unrecognised line name: ",
          lineName,
          " Please define a color for it"
        );
        return createResponse(UNKNOWN_ROAD_COLOR, opacity);
    }
  }

  function deduceCorrectOpacity(
    calculationDone: boolean,
    lineName: string,
    calculatedRouteNode?: ResponseSegment
  ): number {
    if (
      !calculationDone ||
      (calculatedRouteNode && //Calculated route does not inc
        calculatedRouteNode.line === lineName) //Calculation has been done and the line is available
    ) {
      return USED_ROAD_OPACITY;
    }
    return deduceUnusedRoadOpacity(lineName);
  }

  function deduceUnusedRoadOpacity(lineName: string) {
    if (lineName === YELLOW_LINE) {
      return UNUSED_ROAD_OPACITY_YELLOW;
    } else {
      return UNUSED_ROAD_OPACITY;
    }
  }

  function createResponse(lineName: string, opacity: number): RoadStyle {
    return {
      color: lineName,
      opacity: opacity,
    };
  }
}
