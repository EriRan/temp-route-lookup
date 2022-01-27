import React from "react";
import _ from "lodash";

import { TextField } from "@material-ui/core";
import {
  isUndefinedOrNull,
  isUndefinedOrNullOrEmptyString,
} from "../../../../util/Utilities";
import { RouteInputEvent, RouteInputProps } from "./types";
import { Stop } from "../../../../data/mapper/types";
import { useTranslation } from "react-i18next";

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
      !isUndefinedOrNull(props.inputStopData) &&
      !isUndefinedOrNull(props.inputStopData!.name)
    ) {
      return props.inputStopData!.name;
    }
    return "";
  }
  
  function handleChange(event: RouteInputEvent) {
    //Some input validation at first
    if (_.isEmpty(event.target.value)) {
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
  
    const value = _.upperCase(event.target!.value as string);
    props.onChangeFunction(
      value,
      isInputInvalid(value, props.stopMap)
    );
  }
  
  function hasError(): boolean {
    if (
      isUndefinedOrNull(props.inputStopData) ||
      isUndefinedOrNull(props.inputStopData?.hasErrors)
    ) {
      return false;
    }
    return props.inputStopData!.hasErrors!;
  }
  
  function isInputInvalid(input: string, stopMap: Map<string, Stop>) {
    return !isUndefinedOrNullOrEmptyString(input) && !stopMap.has(input);
  }
};

export default RouteInput;
