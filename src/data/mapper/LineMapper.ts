import _ from "lodash";
import { LinesUnmapped, Line } from "./types";

/**
 * Map json bus line data into objects that include
 * - Busline name that is capitalized
 * - Bus stops
 */
class LineMapper {
  public map(linesUnmapped: LinesUnmapped): Array<Line> {
    const mappedLines = new Array<Line>();
    for (const lineName in linesUnmapped) {
      const mappedLine: Line = {
        name: _.capitalize(lineName),
        stopsAt: this.extractStops(linesUnmapped, lineName),
      };
      mappedLines.push(mappedLine);
    }
    return mappedLines;
  }

  /**
   * Extract available lines from the unmapped data. The lines are the variable names and the values of the variable are arrays which contain the stops a busline goes through
   * @param linesUnmapped
   * @param lineName
   * @returns
   */
  private extractStops(
    linesUnmapped: LinesUnmapped,
    lineName: string
  ): Array<string> {
    return linesUnmapped[lineName];
  }
}

export default LineMapper;
