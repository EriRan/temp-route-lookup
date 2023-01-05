import { Road } from "../../../data/mapper/types";
import {
  ERROR_SEVERE_DURING_ROUTE_RESPONSE_CONVERSION,
  ERROR_ROUTE_NOT_FOUND,
} from "./ErrorMessageConstant";
import {
  CalculationResponse,
  ResponseSegment,
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
    return createErrorResponse(ERROR_ROUTE_NOT_FOUND);
  }
  const route = buildRoute(startStop, nodes);
  if (!route.length) {
    return createErrorResponse(ERROR_SEVERE_DURING_ROUTE_RESPONSE_CONVERSION);
  }
  return {
    totalDuration: nodes[nodes.length - 1].nodeDuration,
    route: route,
    errorMessages: [],
  };

  function buildRoute(
    startStop: string,
    nodes: RouteNode[]
  ): ResponseSegment[] {
    const route: ResponseSegment[] = [];
    for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];
      if (i === 0) {
        const createdKey = createStartStopKey(startStop, currentNode);
        if (!createdKey) {
          // Conversion failed due to no stop names available
          return [];
        }
        route.push(
          createOneDirection(
            createdKey,
            startStop,
            currentNode.stopData.name,
            currentNode.selectedLine,
            null
          )
        );
      } else {
        let previousNode = nodes[i - 1];
        const createdKey = createKey(previousNode, currentNode);
        if (!createdKey) {
          // Conversion failed due to no stop names available
          return [];
        }
        route.push(
          createOneDirection(
            createdKey,
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
    const roadBetween = toNode.stopData.roads.find(
      (road) => road.to.name === fromName
    );
    if (!roadBetween) {
      console.error(
        "Unable to find road from stop name " +
          fromName +
          " to stop name " +
          toNode.stopData.name
      );
      return null;
    }
    return createKeyString(roadBetween);
  }

  function createKey(fromNode: RouteNode, toNode: RouteNode): RouteKey | null {
    const roadBetween = toNode.stopData.roads.find(
      (road) => road.to.name === fromNode.stopData.name
    );
    if (!roadBetween) {
      console.error(
        "Unable to find road from stop name " +
          fromNode.stopData.name +
          " to stop name " +
          toNode.stopData.name
      );
      return null;
    }
    return createKeyString(roadBetween);
  }

  /**
   * Create a key for the map which is made of the names of the two stops that the road goes between
   * and a dash between the names. If the road that was found between has flag isReverse, we flip the
   * two stop names around because reverse roads are not rendered
   */
  function createKeyString(roadBetween: Road): RouteKey | null {
    if (roadBetween.isReverse) {
      return roadBetween.to.name + "-" + roadBetween.from.name;
    } else {
      return roadBetween.from.name + "-" + roadBetween.to.name;
    }
  }

  function createOneDirection(
    id: string,
    from: string,
    to: string,
    line: string | null, //Is not normally null except when the values provided are broken
    duration: number | null
  ): ResponseSegment {
    if (!line) {
      console.error(
        "Encountered null line when creating one direction for " +
          from +
          " to " +
          to
      );
    }
    return {
      id: id,
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
      route: [],
      errorMessages: [],
    };
  }
  return {
    totalDuration: null,
    route: [],
    errorMessages: new Array<string>(errorMessage),
  };
}
