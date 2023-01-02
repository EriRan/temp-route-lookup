import { Road } from "../../../../data/mapper/types";

import { ROUTE_NOT_FOUND } from "./ErrorMessageConstant";
import {
  CalculationResponse,
  ResponseDirection,
  RouteKey,
  RouteNode,
} from "./types";

/**
 * Convert the response from calculator to a more compact format for the state and element rendering.
 */
export function convertCalculation(
  startStop: string,
  nodes: RouteNode[]
): CalculationResponse {
  if (nodes.length === 0) {
    return createErrorResponse(ROUTE_NOT_FOUND);
  }
  return {
    totalDuration: nodes[nodes.length - 1].nodeDuration,
    route: buildRoute(startStop, nodes),
    errorMessages: [],
  };

  function buildRoute(startStop: string, nodes: RouteNode[]) {
    const route = new Map();
    for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];
      if (i === 0) {
        route.set(
          createStartStopKey(startStop, currentNode),
          createOneDirection(
            startStop,
            currentNode.stopData.name,
            currentNode.selectedLine,
            null
          )
        );
      } else {
        let previousNode = nodes[i - 1];
        route.set(
          createKey(previousNode, currentNode),
          createOneDirection(
            previousNode.stopData.name,
            currentNode.stopData.name,
            currentNode.selectedLine,
            null
          )
        );
      }
    }
    return route;
  }

  function createStartStopKey(fromName: string, toNode: RouteNode) {
    return createKeyString(
      toNode.stopData.roads.find((road) => road.to.name === fromName)
    );
  }

  function createKey(fromNode: RouteNode, toNode: RouteNode): RouteKey | null {
    return createKeyString(
      toNode.stopData.roads.find(
        (road) => road.to.name === fromNode.stopData.name
      )
    );
  }

  /**
   * Create a key for the map which is made of the names of the two stops that the road goes between
   * and a dash between the names. If the road that was found between has flag isReverse, we flip the
   * two stop names around because reverse roads are not rendered
   */
  function createKeyString(roadBetween: Road | undefined): RouteKey | null {
    if (!roadBetween) {
      console.error("Unable to find route between two stops!");
      return null;
    } else {
      if (roadBetween.isReverse) {
        return roadBetween.to.name + "-" + roadBetween.from.name;
      } else {
        return roadBetween.from.name + "-" + roadBetween.to.name;
      }
    }
  }

  function createOneDirection(
    from: string,
    to: string,
    line: string | null, //Is not normally null except when the values provided are broken
    duration: number | null
  ): ResponseDirection {
    if (!line) {
      console.error(
        "Encountered null line when creating one direction for " +
          from +
          " to " +
          to
      );
    }
    return {
      from: from,
      to: to,
      line: line,
      duration: duration,
    };
  }
}
export function createErrorResponse(
  errorMessage?: string
): CalculationResponse {
  if (!errorMessage) {
    return {
      totalDuration: null,
      route: new Map(),
      errorMessages: [],
    };
  }
  return {
    totalDuration: null,
    route: new Map(),
    errorMessages: new Array<string>(errorMessage),
  };
}
