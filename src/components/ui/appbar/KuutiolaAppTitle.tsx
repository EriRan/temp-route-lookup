import { Typography, withStyles } from "@material-ui/core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { APP_TITLE } from "../../constant/TranslationKeyConstant";
import { KuutiolaAppBarProps } from "./types";

const styles = {
  centeredTitle: {
    margin: "0 auto",
  },
};

const KuutiolaAppTitle: FunctionComponent<KuutiolaAppBarProps> = ({
  classes,
}) => {
  const { t } = useTranslation();
  return (
    <Typography variant="h5" align="center" className={classes.centeredTitle}>
      {t(APP_TITLE)}
    </Typography>
  );
};

export default withStyles(styles)(KuutiolaAppTitle);
