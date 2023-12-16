import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";
import { createMuiTheme, CssBaseline, ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";

/**
 * Root component of the application that gets the full transport data and starts passing it to other components that the full network is built of
 *
 * @returns App component
 */

const theme = createMuiTheme();

const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  return (
    <div className="app">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UiContainer transportData={transportData} />
          <MapView stopMap={transportData.stopMap} />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
