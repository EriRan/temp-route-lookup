import { FunctionComponent } from "react";

import RouteCard from "./card/RouteCard";
import KuutiolaAppBar from "./appbar/KuutiolaAppBar";
import { UiContainerProps } from "./types";

/**
 * Contains user interface components used to control the application
 */
const UiContainer: FunctionComponent<UiContainerProps> = ({
  transportData,
}) => (
  <div>
    <KuutiolaAppBar />
    <RouteCard transportData={transportData} />
  </div>
);

export default UiContainer;
