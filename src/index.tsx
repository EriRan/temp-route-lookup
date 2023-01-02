import { Provider } from "react-redux";
import "./i18n";

import App from "./components/App";
import { createRouteLookupStore } from "./reducers";
import { createRoot } from "react-dom/client";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const container = document.getElementById("root");
const root = createRoot(container!);

const theme = createMuiTheme();

// Wrap the application with Redux state management and Material UI theme
root.render(
  <Provider store={createRouteLookupStore()}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
