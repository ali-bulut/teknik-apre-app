import React from "react";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Texts from "../../../constants/Texts";

const AdminNavbar = (props) => {
  return (
    <React.Fragment>
      <NavDropdown
        className={
          (props.pathName === "/barcodes" ||
            props.pathName === "/barcodes/templates") &&
          "navbar-link-container-active"
        }
        title={
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">qr_code_scanner</i>
            <span className="main-navbar-link">{Texts.barcode}</span>
          </div>
        }
        id="collasible-nav-dropdown"
      >
        <NavDropdown.Item
          className={
            props.pathName === "/barcodes" && "navbar-link-container-active"
          }
          as={Link}
          to="/barcodes"
        >
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">article</i>
            <span className="main-navbar-link">{Texts.barcodes}</span>
          </div>
        </NavDropdown.Item>
        <NavDropdown.Item
          className={
            props.pathName === "/barcode/templates" &&
            "navbar-link-container-active"
          }
          as={Link}
          to="/barcode/templates"
          disabled
        >
          <div className="navbar-link-container">
            <i className="material-icons navbar-icon">view_compact</i>
            <span className="main-navbar-link">{Texts.templates}</span>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
    </React.Fragment>
  );
};

export default AdminNavbar;
