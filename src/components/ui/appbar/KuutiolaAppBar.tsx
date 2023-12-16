import { FunctionComponent } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import KuutiolaAppTitle from "./KuutiolaAppTitle";
import LanguageSelector from "./language/LanguageSelector";

const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = () => {
  return (
    <AppBar color="primary">
      <Toolbar>
        <LanguageSelector />
        <KuutiolaAppTitle />
        <KuutiolaAppBarSubtitle />
      </Toolbar>
    </AppBar>
  );
};

export default KuutiolaAppBar;
