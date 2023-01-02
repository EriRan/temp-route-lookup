import { Provider } from "react-redux";
import "./i18n";

import App from "./components/App";
import { createRouteLookupStore } from "./reducers";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={createRouteLookupStore()}>
    <App />
  </Provider>
);
