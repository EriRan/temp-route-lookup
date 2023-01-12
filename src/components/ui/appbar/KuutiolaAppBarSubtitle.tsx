import { FunctionComponent } from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LOCAL_DEVELOPMENT_VERSION } from "../../constant/TranslationKeyConstant";
import { getNodeEnvironment } from "../../constant/EnvironmentVariable";

/**
 * Secondary title that is displayed if using a development build
 */
const KuutiolaAppBarSubtitle: FunctionComponent<{}> = () => {
  if (getNodeEnvironment() !== "development") {
    return <div />;
  }
  const { t } = useTranslation();
  return (
    <Typography variant="h6" align="center" color="secondary">
      {t(LOCAL_DEVELOPMENT_VERSION)}
    </Typography>
  );
};

export default KuutiolaAppBarSubtitle;
