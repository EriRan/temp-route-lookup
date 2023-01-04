import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import routeReducer from "./route/routeReducer";

// Use Redux Toolkit to setup Redux
const store = configureStore({
  reducer: {
    route: routeReducer,
    language: languageReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
