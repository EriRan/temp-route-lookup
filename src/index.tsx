import { Provider } from "react-redux";
import "./i18n";

import App from "./components/App";
import { createRoot } from "react-dom/client";
import store from "./reducers";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
