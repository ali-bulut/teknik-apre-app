import React from "react";
import { Col, Form } from "react-bootstrap";

import "../../styles/Authentication/login.css";
import Texts from "../../constants/Texts";
import CustomButton from "../Common/CustomButton";
import CustomInputGroup from "../Common/CustomInputGroup";

const LoginPanel = (props) => {
  return (
    <Form className="authentication-card" noValidate onSubmit={props.onSubmit}>
      <Form.Group className="max-width-100" as={Col} md="6">
        <p style={{ marginLeft: 27 }} className="navbar-title-logo">
          {Texts.adminPanelLogin}
        </p>
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <CustomInputGroup
          icon="fas fa-user"
          type="text"
          placeholder={Texts.emailOrUsername}
          name="email"
          referance={props.register}
          isInvalid={props.errors.email}
          autoComplete="true"
          messageType="invalid"
          message={props.errors.email?.message}
        />
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <CustomInputGroup
          icon="fas fa-key"
          type="password"
          placeholder={Texts.password}
          name="password"
          referance={props.register}
          isInvalid={props.errors.password}
          autoComplete="true"
          messageType="invalid"
          message={props.errors.password?.message}
        />
      </Form.Group>
      <Form.Group className="max-width-100" as={Col} md="6">
        <CustomButton
          loading={props.userAuthenticationLoading}
          className="login-submit-button"
          type="submit"
          style={{ borderRadius: 8 }}
        >
          {Texts.signIn}
        </CustomButton>
        <div className="clearfix"></div>
      </Form.Group>
    </Form>
  );
};

export default LoginPanel;
