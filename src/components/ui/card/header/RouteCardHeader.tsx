import React from "react";

import { AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";
import { ROUTE_SEARCH_HEADER } from "../../../constant/TranslationKeyConstant";

const RouteCardHeader = () => {
  const { t } = useTranslation();
  return (
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h5">{t(ROUTE_SEARCH_HEADER)}</Typography>
    </AccordionSummary>
  );
};

export default RouteCardHeader;
