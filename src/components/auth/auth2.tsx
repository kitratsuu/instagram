import React, { ReactNode, useEffect } from "react";
import { useAuthChangeStatusCheck } from "../functions/authfunctions";
import { useBasicData } from "../functions/userfncs";
import { useNavigate } from "react-router-dom";
import Loading from "../extracomponents/loading";

export default function Auth2(props: {
  noAuth: ReactNode;
  onboarding: ReactNode;
  authenticated: ReactNode;
}) {
  const basicdata = useBasicData();
  const statecheck = useAuthChangeStatusCheck();
  const navigate = useNavigate();

  if (statecheck.loading) {
    return <Loading />;
  }
  if (basicdata.loading) {
    return <Loading />;
  }
  if (statecheck.user == null) {
    return <>{props.noAuth}</>;
  }
  if (!basicdata.basicdata?.initSetup) {
    return <>{props.onboarding}</>;
  }
  return <>{props.authenticated}</>;
}
