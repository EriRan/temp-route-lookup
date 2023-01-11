import { FunctionComponent } from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LOCAL_DEVELOPMENT_VERSION } from "../../constant/TranslationKeyConstant";

/**
 * Secondary title that is displayed if using a development build
 */
const KuutiolaAppBarSubtitle: FunctionComponent<{}> = () => {
  const { t } = useTranslation();

  return (
    <Typography variant="h6" align="center" color="secondary">
      {process.env.NODE_ENV === "development"
        ? t(LOCAL_DEVELOPMENT_VERSION)
        : ""}
    </Typography>
  );
};

export default KuutiolaAppBarSubtitle;
