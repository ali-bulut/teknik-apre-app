import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import history from "../../history";
import AdminNavbar from "./Navbar/AdminNavbar";
import { getLocalStorage } from "../../helpers/LocalStorage";
import Texts from "../../constants/Texts";
import RolesPrefix from "../../constants/RolesPrefix";

const MainNavbar = (props) => {
  let pathName = history.location.pathname;

  const role = getLocalStorage()?.role;
  let strRole = null;
  if (role && role !== undefined) {
    strRole = role.charAt(0).toUpperCase() + role.slice(1);
  }

  return (
    <React.Fragment>
      <Navbar
        fixed="top"
        style={{
          paddingRight: 30,
          paddingLeft: 30,
          backgroundColor: "#f1f5fa",
        }}
        collapseOnSelect
        expand="lg"
      >
        <Navbar.Brand className="navbar-main-logo" as={Link} to="/">
          <span className="navbar-title-logo main-logo">
            {Texts.teknikapre}
          </span>
          {strRole && <span className="navbar-role-text">{strRole}</span>}
        </Navbar.Brand>
        <Navbar.Toggle
          style={{ borderColor: "rgba(255,255,255,.6)" }}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {role === RolesPrefix.admin ? (
              <AdminNavbar pathName={pathName} />
            ) : null}
          </Nav>
          {getLocalStorage()?.token && (
            <Nav
              style={{ marginRight: 30 }}
              className="account-navbar-dropdown"
            >
              <NavDropdown
                title={
                  <div className="account">
                    <p className="account-name">
                      {getLocalStorage()
                        ? getLocalStorage().username[0].toUpperCase()
                        : "T"}
                    </p>
                  </div>
                }
                id="account-dropdown"
              >
                <NavDropdown.Item
                  className={
                    pathName === "/logout" && "navbar-link-container-active"
                  }
                  as={Link}
                  to="/logout"
                >
                  <div className="navbar-link-container">
                    <i className="material-icons navbar-icon">logout</i>
                    <span className="main-navbar-link">{Texts.logout}</span>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default MainNavbar;
