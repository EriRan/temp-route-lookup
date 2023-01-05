import { StopState } from "../../types";
import {
  ALREADY_AT_DESTINATION,
  UNKNOWN_END_STOP_INPUTED,
  UNKNOWN_START_STOP_INPUTED,
} from "../ErrorMessageConstant";
import { createErrorResponse } from "../responseConverter";
import { CalculationResponse, RouteNode } from "../types";

/**
 * Validates start and end stop before calculation is ran.
 * @return CalculationResponse with errors if something is wrong with the input or null if everything is all right
 */
class RouteCalculatorInputValidator {
  public validate(
    startStop: StopState,
    destinationStop: StopState,
    allNodesMap: Map<string, RouteNode>
  ): CalculationResponse | null {
    let errorResponse: CalculationResponse | null = createErrorResponse();
    const startStopName = startStop.name?.toUpperCase();
    const destinationStopName = destinationStop.name?.toUpperCase();
    
    if (startStopName && !allNodesMap.get(startStopName)) {
      startStop.hasErrors = true;
      errorResponse.errorMessages.push(UNKNOWN_START_STOP_INPUTED);
    }
    if (destinationStopName && !allNodesMap.get(destinationStopName)) {
      destinationStop.hasErrors = true;
      errorResponse.errorMessages.push(UNKNOWN_END_STOP_INPUTED);
    }
    if (
      startStopName &&
      destinationStopName &&
      startStopName === destinationStopName
    ) {
      //Strictly speaking this is not an input error, so hasErrors remains at false
      errorResponse.errorMessages.push(ALREADY_AT_DESTINATION);
    }

    if (!errorResponse.errorMessages.length) {
      startStop.hasErrors = false;
      destinationStop.hasErrors = false;
      return null;
    }
    return errorResponse;
  }
}

export default RouteCalculatorInputValidator;
