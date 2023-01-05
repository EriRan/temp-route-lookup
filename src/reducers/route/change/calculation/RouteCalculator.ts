import { convertCalculation, createErrorResponse } from "./responseConverter";
import { ERROR_DURING_ROUTE_SEARCH } from "./ErrorMessageConstant";

import { Road, TransportData } from "../../../../data/mapper/types";
import { CalculationResponse, RouteNode } from "./types";
import { StopState } from "../../types";
import RouteCalculatorInputValidator from "./validation/RouteCalculatorInputValidator";
import RouteCalculatorUsedLineDeducer from "./RouteCalculatorUsedLineDeducer";

/**
 * Calculates the shortest path from start point to the destionation using adapted Dijikstra's algorithm.
 *
 * Todo: Consider splitting this into more classes
 */
class RouteCalculator {
  private transportData: TransportData;

  constructor(transportData: TransportData) {
    this.transportData = transportData;
  }

  calculate(
    startStop: StopState,
    destinationStop: StopState
  ): CalculationResponse | null {
    const allNodesMap: Map<string, RouteNode> = createAllNodesStatusMap(
      this.transportData
    );
    const errorResponse = new RouteCalculatorInputValidator().validate(
      startStop,
      destinationStop,
      allNodesMap
    );
    if (errorResponse) {
      return errorResponse;
    }
    if (!hasUsableInput(startStop) || !hasUsableInput(destinationStop)) {
      return null;
    }
    const startStopName = startStop.name!.toUpperCase();
    const destinationStopName = destinationStop.name!.toUpperCase();
    const settledNodeNames: Array<string> = [];
    const unsettledNodeNames: Array<string> = [];

    //Already validated in the validator that startStopName is contained
    allNodesMap.get(startStopName)!.nodeDuration = 0;
    unsettledNodeNames.push(startStopName);
    while (unsettledNodeNames.length > 0) {
      const currentNode = findLowestDurationNode(
        unsettledNodeNames,
        allNodesMap
      );
      if (!currentNode) {
        //Error scenario when lowest duration node is not found for some reason. findLowestDurationNode does a
        //console.error already so no need to do it again in here
        return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
      }
      //Remove a node from the unsettled ones
      removeNode(currentNode.stopData.name, unsettledNodeNames);

      //Traverse all roads that are connected for the current node
      for (const road of currentNode.stopData.roads) {
        if (
          doAnyLinesRunOnRoad(road) &&
          !settledNodeNames.includes(road.to.name)
        ) {
          const adjacentNode = allNodesMap.get(road.to.name);
          if (!adjacentNode) {
            //Error scenario when lowest duration node is not found for some reason
            console.error(
              "Adjacent node does not exist. Node was: " + road.to.name
            );
            return createErrorResponse(ERROR_DURING_ROUTE_SEARCH);
          }
          calculateNodeVariables(currentNode, road, adjacentNode);
          unsettledNodeNames.push(adjacentNode.stopData.name);
        }
      }
      settledNodeNames.push(currentNode.stopData.name);
    }

    const shortestPath = allNodesMap.get(destinationStopName)!.shortestPath;
    //Phase2: Optimize lines used
    new RouteCalculatorUsedLineDeducer().deduce(shortestPath);

    return convertCalculation(startStopName, shortestPath);
  }
}

function createAllNodesStatusMap(transportData: TransportData) {
  const allNodesMap = new Map<string, RouteNode>();
  transportData.stopMap.forEach((stopData, stopName) => {
    allNodesMap.set(stopName, {
      stopData: stopData,
      nodeDuration: Infinity,
      linesAvailable: [],
      selectedLine: null,
      shortestPath: [],
    });
  });
  return allNodesMap;
}

function findLowestDurationNode(
  unsettledNodeNames: Array<string>,
  allNodesMap: Map<string, RouteNode>
): RouteNode | null {
  let lowestDurationNode = null;
  let lowestDuration = Infinity;
  unsettledNodeNames.forEach((unsettledNode) => {
    const unsettledNodeStatus = allNodesMap.get(unsettledNode);
    if (!unsettledNodeStatus) {
      console.error("Unable to find node for: " + unsettledNode);
      return null;
    }
    const nodeDuration = unsettledNodeStatus!.nodeDuration;
    if (nodeDuration < lowestDuration) {
      lowestDuration = nodeDuration;
      lowestDurationNode = unsettledNodeStatus;
    }
  });
  return lowestDurationNode;
}

/**
 * Calculate whether the path from current to adjacent is the fastest available and if so,
 * add the path to the node and which line to use to the adjacent node's variables
 */
function calculateNodeVariables(
  currentNode: RouteNode,
  road: Road,
  adjacentNode: RouteNode
) {
  if (
    currentNode.nodeDuration + road.duration < adjacentNode.nodeDuration
  ) {
    adjacentNode.nodeDuration = currentNode.nodeDuration + road.duration;
    //Copy the shortest path from the current so that we do not modify existing shortest path
    const shortestPath = currentNode.shortestPath.slice();
    shortestPath.push(adjacentNode);
    adjacentNode.shortestPath = shortestPath;
    adjacentNode.linesAvailable = road.includesLines;
  }
}

function doAnyLinesRunOnRoad(road: Road) {
  return road && road.includesLines.length !== 0;
}

/**
 * Remove a node from node names
 * @param nodeNameToRemove
 * @param nodeNames
 */
function removeNode(nodeNameToRemove: string, nodeNames: Array<string>) {
  nodeNames.splice(nodeNames.indexOf(nodeNameToRemove), 1);
}

function hasUsableInput(targetStop: StopState) {
  return targetStop.name;
}

export default RouteCalculator;
