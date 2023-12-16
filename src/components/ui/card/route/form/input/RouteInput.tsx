import { useTranslation } from "react-i18next";
import { Stop } from "../../../../../../data/mapper/types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../reducers/hooks";
import {
  setDestinationStop,
  setStartStop,
} from "../../../../../../reducers/route/routeReducer";
import { StopState } from "../../../../../../reducers/route/types";
import { ROUTE_SEARCH_START_POINT_PLACEHOLDER, ROUTE_SEARCH_END_POINT_PLACEHOLDER } from "../../../../../constant/TranslationKeyConstant";
import { RouteInputProps, RouteInputEvent } from "../../types";
import { RouteInputType } from "./RouteInputConstant";
import { TextField } from "@mui/material";

/**
 * Renders a component where a name of a bus stop can be written to. Has a onChange function as parameter to react to typing. Is not aware whether it is a input for start or destination, which is why we must pass a stopState to it, which can
 * contain errors of a start or destination stop
 * @param props
 * @returns
 */
const RouteInput = (props: RouteInputProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const stopState = selectStopState(props.type);
  return (
    <TextField
      className="center-input"
      label={deduceLabel(props.type)}
      value={stopState.name ? stopState.name : ""}
      variant="outlined"
      margin="dense"
      color="primary"
      //onChange calls an action, which sets the value and whether there are errors.
      //Once the state change is applied here, text input will get the error status
      //from the state
      onChange={handleChange.bind(this)}
      error={hasError(stopState)}
    />
  );

  function deduceLabel(type: RouteInputType): string {
    switch (type) {
      case RouteInputType.START:
        return t(ROUTE_SEARCH_START_POINT_PLACEHOLDER);
      case RouteInputType.DESTINATION:
        return t(ROUTE_SEARCH_END_POINT_PLACEHOLDER);
      default:
        console.error("Unhandled RouteInputType: " + type);
        return "ERROR";
    }
  }

  function selectStopState(type: RouteInputType): StopState {
    switch (type) {
      case RouteInputType.START:
        return useAppSelector((state) => state.route.startStop);
      case RouteInputType.DESTINATION:
        return useAppSelector((state) => state.route.destinationStop);
      default:
        console.error("Unhandled RouteInputType: " + type);
        return {
          name: "",
          hasErrors: true,
        };
    }
  }


  /**
   * Called when we type into a bus stop name text field
   * @param event
   * @returns
   */
  function handleChange(event: RouteInputEvent) {
    //Some input validation at first
    if (!event.target) {
      console.error("Missing target from event");
      dispatch({
        type: deduceDispatchType(props.type),
        payload: {
          name: "",
          hasErrors: isInputInvalid("", props.stopMap),
        },
      });
      return;
    } else if (!event.target.value) {
      dispatch({
        type: deduceDispatchType(props.type),
        payload: {
          name: event.target.value,
          hasErrors: isInputInvalid("", props.stopMap),
        },
      });
      return;
    }
    //Material UI https://material-ui.com/es/guides/typescript/#handling-value-and-event-handlers
    else if (typeof event.target.value !== "string") {
      console.error("Non string input received");
      return;
    }
    const value = event.target.value;
    dispatch({
      type: deduceDispatchType(props.type),
      payload: {
        name: value,
        hasErrors: isInputInvalid(value, props.stopMap),
      },
    });
  }

  function deduceDispatchType(type: RouteInputType): string {
    switch (type) {
      case RouteInputType.START:
        return setStartStop.type;
      case RouteInputType.DESTINATION:
        return setDestinationStop.type;
      default:
        console.error("Unhandled RouteInputType: " + type);
        return "";
    }
  }

  function hasError(stopState: StopState): boolean {
    if (!stopState.hasErrors) {
      return false;
    }
    return stopState.hasErrors;
  }

  function isInputInvalid(input: string, stopMap: Map<string, Stop>) {
    return !!input && !stopMap.has(input);
  }
};

export default RouteInput;
