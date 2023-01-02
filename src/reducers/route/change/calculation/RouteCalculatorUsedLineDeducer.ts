import { UsedLineRouteNode } from "./types";

/**
 * Select lines to use for the route nodes. Prefers the lines which are included the most during the route.
 */
class RouteCalculatorUsedLineDeducer {
  public deduce(shortestPath: Array<UsedLineRouteNode>) {
    //Find out how many times different lines are included
    const lineUsageCountMap = this.createLineUsageCountMap(shortestPath);
    //Find out which lines to use for all route nodes
    let previousNode: UsedLineRouteNode | null = null;
    for (let i = 0; i < shortestPath.length; i++) {
      const currentRouteNode = shortestPath[i];
      this.deduceLinesToUse(currentRouteNode, previousNode, lineUsageCountMap);
      previousNode = currentRouteNode;
    }
  }

  private createLineUsageCountMap(
    shortestPath: UsedLineRouteNode[]
  ): Map<string, number> {
    const lineUsageCountMap: Map<string, number> = new Map();
    shortestPath.forEach((routeNode) => {
      routeNode.linesAvailable.forEach((line) => {
        let currentCountForLine = lineUsageCountMap.get(line);
        if (!currentCountForLine) {
          lineUsageCountMap.set(line, 1);
        } else {
          lineUsageCountMap.set(line, ++currentCountForLine);
        }
      });
    });
    return lineUsageCountMap;
  }

  private deduceLinesToUse(
    currentRouteNode: UsedLineRouteNode,
    previousNode: UsedLineRouteNode | null,
    lineUsageCountMap: Map<string, number>
  ) {
    if (!previousNode) {
      //If previous node is null, select the line with best availability
      currentRouteNode.selectedLine = this.deduceBestAvailableLine(
        currentRouteNode,
        lineUsageCountMap
      );
    } else {
      //If previous node is not null and same line is available on the next node, use the same line
      if (
        this.canUseSameLineAsPrevious(
          currentRouteNode.linesAvailable,
          previousNode
        )
      ) {
        currentRouteNode.selectedLine = previousNode.selectedLine;
      } else {
        //If previous node is not null and the same line is not available on the next node, use the line with best availability
        currentRouteNode.selectedLine = this.deduceBestAvailableLine(
          currentRouteNode,
          lineUsageCountMap
        );
      }
    }
  }

  private deduceBestAvailableLine(
    currentRouteNode: UsedLineRouteNode,
    lineUsageCountMap: Map<string, number>
  ): string | null {
    if (!currentRouteNode.linesAvailable) {
      return null;
    }
    if (currentRouteNode.linesAvailable.length === 1) {
      return currentRouteNode.linesAvailable[0];
    }
    let currentBestLine: string | null = null;
    let currentBestCount: number | null = null;
    for (let i = 0; i < currentRouteNode.linesAvailable.length; i++) {
      const currentLine = currentRouteNode.linesAvailable[i];
      const lineUsageCount = lineUsageCountMap.get(currentLine);
      if (!lineUsageCount) {
        console.error("No usage count for line: " + currentLine);
        continue;
      }
      if (!currentBestCount || currentBestCount < lineUsageCount) {
        currentBestCount = lineUsageCount;
        currentBestLine = currentLine;
      }
    }
    return currentBestLine;
  }

  private canUseSameLineAsPrevious(
    linesAvailable: string[],
    previousNode: UsedLineRouteNode
  ) {
    return (
      linesAvailable &&
      linesAvailable.some((line) => line === previousNode.selectedLine)
    );
  }
}

export default RouteCalculatorUsedLineDeducer;
