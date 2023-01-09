import { ResponseSegment } from "../../../../reducers/route/calculation/types";
import { ROUTE_RESULT_UNKNOWN_LINE } from "./CompressedRouteConstant";
import { CompressedRoute } from "./types";

/**
 * Compress results of the route calculation to smaller size by making stops point to the stop at which we must change line or the calculated route ends there.
 */
export function compressResponse(
  routes: Array<ResponseSegment>
): Array<CompressedRoute> {
  if (!routes) {
    return [];
  }
  const compressedResponse = Array<CompressedRoute>();
  let currentLine: string | null = null;
  let currentLineStartStop: string | null = null;
  for (let i = 0; i < routes.length; i++) {
    let iteratedRoute: ResponseSegment = routes[i];
    let isLast = isLastRoute(i, routes);
    if (!currentLineStartStop) {
      currentLine = iteratedRoute.line;
      currentLineStartStop = iteratedRoute.from;
    }
    if (isLast) {
      addLastRoutes(iteratedRoute, currentLineStartStop, currentLine);
    } else if (!currentLine || currentLine !== iteratedRoute.line) {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.from,
          currentLine
        )
      );
      currentLine = iteratedRoute.line;
      currentLineStartStop = iteratedRoute.from;
    }
  }
  return compressedResponse;

  function addLastRoutes(
    iteratedRoute: ResponseSegment,
    currentLineStartStop: string,
    currentLine: string | null
  ) {
    if (currentLine === iteratedRoute.line) {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.to,
          currentLine
        )
      );
    } else {
      compressedResponse.push(
        createCompressedNode(
          currentLineStartStop,
          iteratedRoute.from,
          currentLine
        )
      );
      compressedResponse.push(
        createCompressedNode(
          iteratedRoute.from,
          iteratedRoute.to,
          iteratedRoute.line
        )
      );
    }
  }

  function isLastRoute(i: number, routes: Array<ResponseSegment>) {
    return i === routes.length - 1;
  }

  function createCompressedNode(
    currentLineStart: string,
    currentLineEnd: string,
    currentLine: string | null
  ): CompressedRoute {
    if (!currentLine) {
      //Very marginal case. Something is very wrong if we end up here
      console.error(
        "Current line was null for line from " +
          currentLineStart +
          " to " +
          currentLineEnd
      );
      return {
        from: currentLineStart,
        to: currentLineEnd,
        line: "",
        error: ROUTE_RESULT_UNKNOWN_LINE
      };
    }
    return {
      from: currentLineStart,
      to: currentLineEnd,
      line: currentLine,
    };
  }
}
