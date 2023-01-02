import React from "react";

import { TextField } from "@material-ui/core";
import { RouteInputEvent, RouteInputProps } from "./types";
import { Stop } from "../../../../data/mapper/types";
import { useTranslation } from "react-i18next";

/**
 * Renders a component where a name of a bus stop can be written to. Has a onChange function as parameter to react to typing
 * @param props
 * @returns 
 */
const RouteInput = (props: RouteInputProps) => {
  const { t } = useTranslation();
  return (
    <TextField
      className="center-input"
      label={t(props.label)}
      autoFocus={props.autoFocus}
      value={getCurrentValue()}
      variant="outlined"
      margin="dense"
      color="primary"
      //onChange calls an action, which sets the value and whether there are errors.
      //Once the state change is applied here, text input will get the error status
      //from the state
      onChange={handleChange.bind(this)}
      error={hasError()}
    />
  );

  function getCurrentValue() {
    if (
      props.inputStopData &&
      props.inputStopData!.name
    ) {
      return props.inputStopData!.name;
    }
    return "";
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
      props.onChangeFunction(
        "",
        isInputInvalid("", props.stopMap)
      );
    }
    if (!event.target.value) {
      props.onChangeFunction(
        "",
        isInputInvalid("", props.stopMap)
      );
    }
    //Material UI https://material-ui.com/es/guides/typescript/#handling-value-and-event-handlers
    if (typeof event.target.value !== "string") {
      console.error("Non string input received");
      return;
    }
  
    const value = event.target.value;
    props.onChangeFunction(
      value,
      isInputInvalid(value, props.stopMap)
    );
  }
  
  function hasError(): boolean {
    if (
      !props.inputStopData ||
      !props.inputStopData?.hasErrors
    ) {
      return false;
    }
    return props.inputStopData!.hasErrors!;
  }
  
  function isInputInvalid(input: string, stopMap: Map<string, Stop>) {
    return input && !stopMap.has(input);
  }
};

export default RouteInput;
