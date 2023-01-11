import { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar } from "@material-ui/core";
import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import KuutiolaAppTitle from "./KuutiolaAppTitle";
import LanguageSelector from "./language/LanguageSelector";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

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

export default withStyles(styles)(KuutiolaAppBar);
