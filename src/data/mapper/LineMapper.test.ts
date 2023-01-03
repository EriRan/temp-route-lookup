import LineMapper from "./LineMapper";
import { LinesUnmapped } from "./types";

describe("LineMapper", () => {
  const mapper = new LineMapper();

  test("Can map lines", () => {
    const mappedLines = mapper.map(createMockLinesJson());
    expect(mappedLines).toBeDefined();
    expect(mappedLines.length).toBe(4);
    mappedLines.forEach((mappedLine) => {
      expect(mappedLine.name).toBeDefined();
      expect(mappedLine.stopsAt).toBeInstanceOf(Array);
      expect(mappedLine.stopsAt.length).toBeGreaterThan(0);
    });
  });

  test("Can lines with names other than in original reittiopas.json", () => {
    const unexepctedLines: LinesUnmapped = {
      joker: ["J", "K", "R"],
      batman: ["B", "A", "T"],
    };
    const mappedLines = mapper.map(unexepctedLines);
    expect(mappedLines).toBeDefined();
    expect(mappedLines.length).toBe(2);
    mappedLines.forEach((mappedLine) => {
      expect(mappedLine.name).toBeDefined();
      expect(mappedLine.stopsAt).toBeInstanceOf(Array);
      expect(mappedLine.stopsAt.length).toBeGreaterThan(0);
    });
  });

  function createMockLinesJson(): LinesUnmapped {
    return {
      punainen: ["A", "B", "C"],
      keltainen: ["Z", "X", "Y"],
      vihreä: ["C", "D", "Z"],
      sininen: ["R", "F", "S"],
    };
  }
});
