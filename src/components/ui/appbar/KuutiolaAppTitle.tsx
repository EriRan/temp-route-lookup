import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { APP_TITLE } from "../../constant/TranslationKeyConstant";
import { KuutiolaAppBarProps } from "./types";
import Typography from "@mui/material/Typography";

const KuutiolaAppTitle: FunctionComponent<KuutiolaAppBarProps> = ({
}) => {
  const { t } = useTranslation();
  return (
    <Typography variant="h5" align="center" sx={{margin: "0 auto"}}>
      {t(APP_TITLE)}
    </Typography>
  );
};

export default KuutiolaAppTitle;
