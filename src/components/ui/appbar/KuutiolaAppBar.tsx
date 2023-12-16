import { FunctionComponent } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/AppBar";
import { KuutiolaAppBarProps } from "./types";
import KuutiolaAppBarSubtitle from "./KuutiolaAppBarSubtitle";
import KuutiolaAppTitle from "./KuutiolaAppTitle";
import LanguageSelector from "./language/LanguageSelector";
import { Container } from "@mui/material";

const KuutiolaAppBar: FunctionComponent<KuutiolaAppBarProps> = () => {
  return (
    <AppBar position="static" color="primary" sx={{ margin: "0 auto" }}>
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
