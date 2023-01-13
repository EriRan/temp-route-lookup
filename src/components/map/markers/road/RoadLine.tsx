import { FunctionComponent } from "react";

import RoadLineDuration from "./RoadLineDuration";
import { provideStyles } from "./roadStyleProvider";
import { LINE_GAP } from "./RoadConstant";
import { RoadLineProps, RoadStyle } from "./types";
import { BusStopLocation } from "../../types";
import { Road } from "../../../../data/mapper/types";
import { ResponseSegment } from "../../../../reducers/route/calculation/types";

/**
 * One or more lines and a duration number in the middle of them. The amount of lines depends on how many bus lines run between the road between two bus stops
 */
const RoadLine: FunctionComponent<RoadLineProps> = (props) => {
  return (
    <g className="road-line">
      {renderLinesAndDuration(
        props.roadData,
        props.calculationDone,
        props.startPointLocation,
        props.endPointLocation,
        props.calculatedRouteNode,
      )}
    </g>
  );

  function renderLinesAndDuration(
    roadData: Road,
    calculationDone: boolean,
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    calculatedRouteNode?: ResponseSegment,
  ) {
    
    const styleObjects = provideStyles(
      calculationDone,
      roadData.includesLines,
      calculatedRouteNode
    );
    // Render lines
    const objectsToRender = Array<JSX.Element>();
    for (let i = 0; i < styleObjects.length; i++) {
      objectsToRender.push(
        renderOneLine(
          startPointLocation!,
          endPointLocation!,
          roadData,
          styleObjects[i],
          i
        )
      );
    }
    if (!calculationDone || calculatedRouteNode) {
      objectsToRender.push(
        renderDuration(startPointLocation, endPointLocation, roadData)
      );
    }

    return objectsToRender;
  }


  /**
   * If there are multiple lines, draw each one LINE_GAP amount from each other.
   *
   * The direction where the next line is placed to depends on which direction the line is going: If the line is horizontal,
   * we must draw the next one below it and not next to it so the lines do not overlap.
   */
  function renderOneLine(
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    roadData: Road,
    styleObject: RoadStyle,
    index: number
  ): JSX.Element {
    if (isLineHorizontal(startPointLocation.x, endPointLocation.x)) {
      return (
        <line
          key={`line-${roadData.from.name}-${roadData.to.name}-${styleObject.color}`}
          x1={startPointLocation.x}
          y1={startPointLocation.y + distanceFromOtherLine(index)}
          x2={endPointLocation.x}
          y2={endPointLocation.y + distanceFromOtherLine(index)}
          stroke={styleObject.color}
          opacity={styleObject.opacity}
        />
      );
    }
    return (
      <line
        key={`line-${roadData.from.name}-${roadData.to.name}-${styleObject.color}`}
        x1={startPointLocation.x + distanceFromOtherLine(index)}
        y1={startPointLocation.y}
        x2={endPointLocation.x + distanceFromOtherLine(index)}
        y2={endPointLocation.y}
        stroke={styleObject.color}
        opacity={styleObject.opacity}
      />
    );
  }

  function renderDuration(
    startPointLocation: BusStopLocation,
    endPointLocation: BusStopLocation,
    roadData: Road
  ) {
    return (
      <RoadLineDuration
        key={`duration-${roadData.from.name}-${roadData.to.name}`}
        startPointLocation={startPointLocation}
        endPointLocation={endPointLocation}
        duration={roadData.duration}
      />
    );
  }

  function distanceFromOtherLine(index: number) {
    return index * LINE_GAP;
  }

  /**
   * Deduce whether the two provided x coordinates would form a horizontal line, if a line was drawn between those two x coordinates.
   * See below ASCII image for illustration
   *
   * *******
   * *******
   * *x---x*
   * *******
   * *******
   * @param xOne the first x coordinate
   * @param xTwo the second x coordinate
   * @returns
   */
  function isLineHorizontal(xOne: number, xTwo: number) {
    return xOne === xTwo;
  }
};

export default RoadLine;
