/**
 * Full data coming from reittiopas.json mapped as a Typescript type
 */
export type TransportDataUnmapped = {
  pysakit: Array<string>; //Unmapped stops
  tiet: Array<RoadUnmapped>; // Unmapped roads
  linjastot: LinesUnmapped; // Unmapped lines
};

/**
 * Linjastot in reittiopas.json which provide all available buslines and the bus stops they stop on. Buslines names are defined by their variable name and the stops they run on in an array as the value of the variable.
 * This is not a good way to define bus lines but thats the way they were in the original JSON.
 */
export type LinesUnmapped = {
  [key: string]: string[];
};

/**
 * Unmapped roads from reittiopas.json that describe connections from one bus stop to another and how long do they take
 */
export type RoadUnmapped = {
  mista: string; // From where
  mihin: string; // To where
  kesto: number; // Duration
};

/**
 * Full transport data from reittiopas.json mapped into a more convenient format
 */
export type TransportData = {
  stopMap: Map<string, Stop>;
  lines: Array<Line>;
};

/**
 * Busline that runs on the roads
 */
export type Line = {
  name: string;
  stopsAt: Array<string>;
};

/**
 * Road between two stops
 */
export type Road = {
  from: Stop;
  to: Stop;
  duration: number;
  isReverse: boolean;
  includesLines: Array<string>;
};

export type Stop = {
  name: string;
  roads: Array<Road>;
};
