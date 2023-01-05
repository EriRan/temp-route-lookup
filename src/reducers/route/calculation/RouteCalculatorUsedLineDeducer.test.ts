import RouteCalculatorUsedLineDeducer from "./RouteCalculatorUsedLineDeducer";
import { UsedLineRouteNode } from "./types";

const usedLineDeducer = new RouteCalculatorUsedLineDeducer();

test("Route with just one line", () => {
  const shortestPath = new Array<UsedLineRouteNode>();
  const onlyLine = "lineOne";
  shortestPath.push(createUsedLineRouteNode([onlyLine]));
  shortestPath.push(createUsedLineRouteNode([onlyLine]));
  shortestPath.push(createUsedLineRouteNode([onlyLine]));
  usedLineDeducer.deduce(shortestPath);

  expect(shortestPath.length).toBe(3);
  shortestPath.forEach((routeNode) => {
    expect(routeNode.selectedLine).toBe(onlyLine);
  });
});

test("Route with first line having not all stops and the second has all", () => {
  const shortestPath = new Array<UsedLineRouteNode>();
  const firstLine = "lineOne";
  const secondLine = "lineTwo";
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([secondLine]));
  usedLineDeducer.deduce(shortestPath);

  expect(shortestPath.length).toBe(3);
  shortestPath.forEach((routeNode) => {
    expect(routeNode.selectedLine).toBe(secondLine);
  });
});

test("Least occurring used if no other is available", () => {
  const shortestPath = new Array<UsedLineRouteNode>();
  const firstLine = "lineOne";
  const secondLine = "lineTwo";
  const thirdLine = "lineThree";
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine]));
  shortestPath.push(createUsedLineRouteNode([thirdLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine]));
  usedLineDeducer.deduce(shortestPath);

  expect(shortestPath.length).toBe(5);
  expect(shortestPath[0].selectedLine).toBe(firstLine);
  expect(shortestPath[1].selectedLine).toBe(firstLine);
  expect(shortestPath[2].selectedLine).toBe(thirdLine);
  expect(shortestPath[3].selectedLine).toBe(firstLine);
  expect(shortestPath[4].selectedLine).toBe(firstLine);
});

test("Prefer previous even if one line has more occurances", () => {
  const shortestPath = new Array<UsedLineRouteNode>();
  const firstLine = "lineOne";
  const secondLine = "lineTwo";
  shortestPath.push(createUsedLineRouteNode([firstLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([firstLine, secondLine]));
  shortestPath.push(createUsedLineRouteNode([secondLine]));
  shortestPath.push(createUsedLineRouteNode([secondLine]));
  usedLineDeducer.deduce(shortestPath);

  expect(shortestPath.length).toBe(6);
  expect(shortestPath[0].selectedLine).toBe(firstLine);
  expect(shortestPath[1].selectedLine).toBe(firstLine);
  expect(shortestPath[2].selectedLine).toBe(firstLine);
  expect(shortestPath[3].selectedLine).toBe(firstLine);
  expect(shortestPath[4].selectedLine).toBe(secondLine);
  expect(shortestPath[5].selectedLine).toBe(secondLine);
});

/**
 * Shouldn't occur in the real world but if it does, then this should be done
 */
test("No lines available keeps selected as null", () => {
  const shortestPath = new Array<UsedLineRouteNode>();
  shortestPath.push(createUsedLineRouteNode([]));
  usedLineDeducer.deduce(shortestPath);

  expect(shortestPath.length).toBe(1);
  shortestPath.forEach((routeNode) => {
    expect(routeNode.selectedLine).toBeNull();
  });
});

function createUsedLineRouteNode(
  linesAvailable: Array<string>
): UsedLineRouteNode {
  return {
    selectedLine: null,
    linesAvailable: linesAvailable,
  };
}
