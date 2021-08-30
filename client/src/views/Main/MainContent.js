import React from "react";
import { useHistory } from "react-router-dom";

import MainNavbar from "../../components/Common/MainNavbar";
import MainPanel from "../../components/Common/MainPanel";
import { getLocalStorage } from "../../helpers/LocalStorage";
import AuthenticationContainer from "../Authentication/AuthenticationContainer";

const MainContent = (props) => {
  const data = getLocalStorage();
  let role = null;
  if (data) {
    role = data.role;
  }
  const history = useHistory();
  let pageRoute = history.location.pathname;
  let pageName = pageRoute.replace("/", "").replace("-", " ").toUpperCase();

  if (pageRoute === "/login") {
    return <AuthenticationContainer>{props.children}</AuthenticationContainer>;
  }

  return (
    <React.Fragment>
      <MainNavbar role={role} pageName={pageName} pageRoute={pageRoute} />
      <MainPanel style={props.style}>{props.children}</MainPanel>
    </React.Fragment>
  );
};

export default MainContent;
