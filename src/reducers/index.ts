import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import routeReducer from "./route/routeReducer";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  route: routeReducer,
  language: languageReducer,
});

/**
 * Use Redux Toolkit to setup Redux
 * @param preloadedState overwrite initial state with a custom one. Needed by component tests
 * @returns Redux store ready to use by providers
 */
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      route: routeReducer,
      language: languageReducer,
    },
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
