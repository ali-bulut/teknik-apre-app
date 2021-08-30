import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthenticationNavbar from "../../components/Common/Navbar/AuthenticationNavbar";
import Texts from "../../constants/Texts";

import "../../styles/Authentication/main.css";

const AuthenticationContainer = (props) => {
  return (
    <React.Fragment>
      <Container className="main-container">
        <AuthenticationNavbar />
        <Row
          style={{ maxHeight: "75%", overflow: "scroll" }}
          className="login-form-container d-flex justify-content-center align-items-center"
        >
          <Col className="login-form" md="6" sm="12" xs="12">
            {props.children}
          </Col>
        </Row>
        <p
          style={{
            color: "white",
            fontSize: 14,
            position: "absolute",
            bottom: 10,
            textShadow: "1px 1px 10px white",
            marginBottom: 0,
          }}
        >
          © {new Date().getFullYear()} {Texts.corpText}
        </p>
      </Container>
    </React.Fragment>
  );
};

export default AuthenticationContainer;
