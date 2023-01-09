import { Provider } from "react-redux";
import "./i18n";

import App from "./components/App";
import { createRoot } from "react-dom/client";
import { setupStore } from "./reducers";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
