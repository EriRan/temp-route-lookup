import { useTranslation } from "react-i18next";
import { ROUTE_SEARCH_HEADER } from "../../../constant/TranslationKeyConstant";
import { AccordionSummary, Typography } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore"

const RouteCardHeader = () => {
  const { t } = useTranslation();
  return (
    <AccordionSummary expandIcon={<ExpandMore />}>
      <Typography variant="h5">{t(ROUTE_SEARCH_HEADER)}</Typography>
    </AccordionSummary>
  );
};

export default RouteCardHeader;
