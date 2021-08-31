import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavbar = (props) => {
  return (
    <React.Fragment>
      <NavDropdown
        className={
          (props.pathName === "/barcode/parties" ||
            props.pathName === "/barcode/templates") &&
          "navbar-link-container-active"
        }
        title={
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">qr_code_scanner</i>
            <span className="main-navbar-link">Barkod</span>
          </div>
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item
          className={
            props.pathName === "/barcode/parties" &&
            "navbar-link-container-active"
          }
          as={Link}
          to="/barcode/parties"
        >
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">article</i>
            <span className="main-navbar-link">Partiler</span>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Item
          className={
            props.pathName === "/barcode/templates" &&
            "navbar-link-container-active"
          }
          as={Link}
          to="/barcode/templates"
        >
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">view_compact</i>
            <span className="main-navbar-link">Şablonlar</span>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </React.Fragment>
  );
};

export default AdminNavbar;
