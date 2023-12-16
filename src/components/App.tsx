import TransportDataSingleton from "../data/TransportDataSingleton";
import UiContainer from "./ui/UiContainer";
import MapView from "./map/MapView";

/**
 * Root component of the application that gets the full transport data and starts passing it to other components that the full network is built of
 *
 * @returns App component
 */

const App = () => {
  const transportData = TransportDataSingleton.getInstance();
  return (
    <div className="app">
      <UiContainer transportData={transportData} />
      <MapView stopMap={transportData.stopMap} />
    </div>
  );
};

export default App;
