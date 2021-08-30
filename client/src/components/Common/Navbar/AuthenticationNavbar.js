import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Texts from "../../../constants/Texts";

const AuthenticationNavbar = () => {
  return (
    <Navbar
      style={{ paddingRight: 3, paddingLeft: 7 }}
      collapseOnSelect
      expand="lg"
      bg="transparent"
    >
      <Navbar.Brand className="navbar-main-logo" as={Link} to="/">
        <p className="navbar-title-logo main-logo" style={{ marginLeft: 19 }}>
          {Texts.teknikapre}
        </p>
      </Navbar.Brand>
    </Navbar>
  );
};

export default AuthenticationNavbar;
