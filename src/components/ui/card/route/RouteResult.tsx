import { connect, ConnectedProps } from "react-redux";

import { Divider, Typography } from "@material-ui/core";

import { compressResponse } from "./routeResponseCompressor";
import { RootState } from "../../../../reducers/types";
import { CalculationResponse } from "../../../../reducers/route/change/calculation/types";
import _ from "lodash";
import RouteResultErrors from "./RouteResultErrors";
import { useTranslation } from "react-i18next";
import { CompressedRoute } from "./types";

const RouteResult = (props: Props) => {
  const { t } = useTranslation();
  if (props.calculatedRoute) {
    return renderRoute(props.calculatedRoute!);
  }
  return <div />;

  function renderRoute(calculatedRoute: CalculationResponse) {
    if (!_.isEmpty(calculatedRoute.errorMessages)) {
      return (
        <RouteResultErrors errorMessages={calculatedRoute.errorMessages} />
      );
    }
    if (!calculatedRoute.route) {
      return <div />;
    }

    const compressedRouteData = compressResponse(
      Array.from(calculatedRoute.route!.values())
    ).map((stopRoute) => {
      return (
        <Typography key={`result-stop-${stopRoute.from}-${stopRoute.to}`}>
            {renderRouteDescription(stopRoute)}
        </Typography>
      );
    });
    return (
      <div>
        {compressedRouteData}
        <Divider />
        <Typography>
          {renderTotalDuration(calculatedRoute.totalDuration)}
        </Typography>
      </div>
    );
  }

  function renderRouteDescription(stopRoute: CompressedRoute) {
    return stopRoute.from + "→" + stopRoute.to + " " + t("ROUTE_RESULT_WITH_LINE") + " " + stopRoute.line
  }

  function renderTotalDuration(totalDuration: number | null) {
    return t("ROUTE_RESULT_TOTAL_DURATION") + ":" + totalDuration
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    calculatedRoute: state.route.calculatedRoute,
  };
};

const connector = connect(mapStateToProps, {});

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export default connector(RouteResult);
