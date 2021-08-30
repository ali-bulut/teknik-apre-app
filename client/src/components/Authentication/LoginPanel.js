import React from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";

import "../../styles/Authentication/login.css";
import Texts from "../../constants/Texts";

const LoginPanel = (props) => {
  return (
    <Form className="authentication-card" noValidate onSubmit={props.onSubmit}>
      <Form.Group className="max-width-100" as={Col} md="6">
        <p style={{ marginLeft: 27 }} className="navbar-title-logo">
          {Texts.adminPanelLogin}
        </p>
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">
              <i className="fas fa-user"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="form-input"
            type="text"
            placeholder={Texts.emailOrUsername}
            name="email"
            ref={props.register}
            isInvalid={props.errors.email}
            autoComplete="true"
          />
          <Form.Control.Feedback type="invalid">
            {props.errors.email?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <i className="fas fa-key"></i>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="form-input"
            type="password"
            placeholder={Texts.password}
            name="password"
            ref={props.register}
            isInvalid={props.errors.password}
            autoComplete="true"
          />
          <Form.Control.Feedback type="invalid">
            {props.errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <Button
          disabled={props.userAuthenticationLoading}
          className="login-submit-button"
          type="submit"
        >
          {Texts.signIn}
        </Button>
        <div className="clearfix"></div>
      </Form.Group>
    </Form>
  );
};

export default LoginPanel;
