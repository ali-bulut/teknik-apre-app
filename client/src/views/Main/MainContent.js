import React from "react";
import { useHistory } from "react-router-dom";

import MainNavbar from "../../components/Common/MainNavbar";
import MainPanel from "../../components/Common/MainPanel";
import RolesPrefix from "../../constants/RolesPrefix";
import { getSubDomain } from "../../helpers/RouteRedirection";
import AuthenticationContainer from "../Authentication/AuthenticationContainer";

const MainContent = (props) => {
  const history = useHistory();
  let pageRoute = history.location.pathname;

  if (pageRoute === "/login") {
    return <AuthenticationContainer>{props.children}</AuthenticationContainer>;
  }

  return (
    <React.Fragment>
      {getSubDomain() !== RolesPrefix.admin ? (
        <React.Fragment>{props.children}</React.Fragment>
      ) : (
        <React.Fragment>
          <MainNavbar />
          <MainPanel style={props.style}>{props.children}</MainPanel>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MainContent;
