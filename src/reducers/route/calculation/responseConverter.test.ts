import { convertCalculation } from "./responseConverter";

import { ROUTE_NOT_FOUND } from "./ErrorMessageConstant";
import { RouteNode } from "./types";
import { Road } from "../../../data/mapper/types";

test("Route not found error", () => {
  const nodes: RouteNode[] = [];
  const startStop = "A";
  const response = convertCalculation(startStop, nodes);
  expect(response).toBeDefined();
  expect(response.errorMessages).toContain(ROUTE_NOT_FOUND);
});

test("Valid route", () => {
  const nodes: RouteNode[] = [];
  const startStop = "A";
  pushNextNode(nodes, startStop, "B", "C", 2, "line1");
  pushNextNode(nodes, startStop, "C", "D", 4, "line1");
  pushNextNode(nodes, startStop, "D", "E", 10, "line2");
  pushNextNode(nodes, startStop, "E", null, 12, "line2");
  const response = convertCalculation(startStop, nodes);

  expect(response).toBeDefined();
  expect(response.errorMessages).toBeDefined();
  expect(response.errorMessages.length).toBe(0);
  expect(response.totalDuration).toBe(12);
  expect(response.route).toBeInstanceOf(Array);

  //Validate keys created from paths between stops exist
  expect(response.route!.find(segment => segment.id === "A-B")).toBeDefined();
  expect(response.route!.find(segment => segment.id === "B-C")).toBeDefined();
  expect(response.route!.find(segment => segment.id === "C-D")).toBeDefined();
  expect(response.route!.find(segment => segment.id === "D-E")).toBeDefined();
});

/**
 * Push the same kind of data to a array that would come from RouteCalculator to responseConverter. Links the nodes together with
 * roads that are created to both previous and next after the first added node.
 *
 * First pushed node is a special case because we need to create a link to the start node which is where the route calculation starts from.
 */
function pushNextNode(
  currentNodes: RouteNode[],
  startStop: string,
  fromName: string,
  toName: string | null,
  nodeDuration: number,
  lineBeingUsed: string
) {
  if (currentNodes.length === 0) {
    currentNodes.push({
      stopData: {
        name: fromName,
        roads: createRoadToNextAndPrevious(startStop, fromName, toName),
      },
      nodeDuration: nodeDuration,
      selectedLine: lineBeingUsed,
      linesAvailable: [], //Not important here
      shortestPath: [],
    });
  } else {
    const previousNode = currentNodes[currentNodes.length - 1];
    currentNodes.push({
      stopData: {
        name: fromName,
        roads: createRoadToNextAndPrevious(
          previousNode.stopData.name,
          fromName,
          toName
        ),
      },
      nodeDuration: nodeDuration,
      selectedLine: lineBeingUsed,
      linesAvailable: [], //Not important here
      shortestPath: [],
    });
  }
}

/**
 * Create roads between two stops. If toName is null, just create a reverse road to the previous stop
 * @param previousName
 * @param fromName
 * @param toName
 * @returns
 */
function createRoadToNextAndPrevious(
  previousName: string,
  fromName: string,
  toName: string | null
): Road[] {
  if (toName == null) {
    return [createOneRoad(fromName, previousName, true)];
  } else {
    return [
      createOneRoad(fromName, toName, false),
      createOneRoad(fromName, previousName, true),
    ];
  }
}

function createOneRoad(
  fromName: string,
  toName: string,
  isReverse: boolean
): Road {
  return {
    from: {
      name: fromName,
      roads: [],
    },
    to: {
      name: toName,
      roads: [],
    },
    duration: 2, //Irrelevant for the test
    isReverse: isReverse,
    includesLines: new Array<string>(),
  };
}
