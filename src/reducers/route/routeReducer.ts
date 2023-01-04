import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  calculateNewRoute,
  changeStartOrDestination,
} from "./change/stopsStateChangeDeducer";
import { Payload, RouteStore } from "./types";

const initialState: RouteStore = {
  calculatedRoute: null,
  startStop: { name: null, hasErrors: false },
  destinationStop: { name: null, hasErrors: false },
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setStartStop(state, action: PayloadAction<Payload>) {
      // TODO: Not 100% sure whether Immer works inside this function. Verify this
      state.startStop = action.payload;
      calculateNewRoute(state);
    },
    setDestinationStop(state, action: PayloadAction<Payload>) {
      // TODO: Not 100% sure whether Immer works inside this function. Verify this
      state.destinationStop = action.payload;
      calculateNewRoute(state);
    },
    stopClicked(state, action: PayloadAction<Payload>) {
      // TODO: Not 100% sure whether Immer works inside this function. Verify this
      changeStartOrDestination(state, action.payload);
    },
  },
});

export const { setStartStop, setDestinationStop, stopClicked } =
  routeSlice.actions;

export default routeSlice.reducer;
