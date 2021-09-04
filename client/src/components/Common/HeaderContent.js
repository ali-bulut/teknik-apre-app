import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const HeaderContent = (props) => {
  return (
    <Row>
      <Col md="12">
        {props.headerTitle && (
          <span style={{ fontSize: 24, fontWeight: "500" }}>
            {props.headerTitle}
          </span>
        )}

        <CustomButton
          variant="link"
          className={props.className || "float-left"}
          style={{
            color: "#7c4dff",
            borderRadius: 5,
            border: "1px solid #7c4dff",
          }}
          as={Link}
          to={props.to}
        >
          {props.buttonText}
        </CustomButton>

        {props.extraButtonText && (
          <CustomButton
            variant="link"
            style={{
              color: "#7c4dff",
              borderRadius: 5,
              border: "1px solid #7c4dff",
            }}
            className="float-right"
            onClick={props.onClick}
            loading={props.loading}
          >
            {props.extraButtonText}
          </CustomButton>
        )}
      </Col>
    </Row>
  );
};

export default HeaderContent;
