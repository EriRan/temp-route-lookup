import { FunctionComponent } from "react";

import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import KuutiolaAppTitle from "./KuutiolaAppTitle";
import LanguageSelector from "./language/LanguageSelector";
import { AppBar, Container, Toolbar } from "@mui/material";

const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = () => {
  return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <LanguageSelector />
            <KuutiolaAppTitle />
            <KuutiolaAppBarSubtitle />
          </Toolbar>
        </Container>
      </AppBar>
  );
};

export default KuutiolaAppBar;
