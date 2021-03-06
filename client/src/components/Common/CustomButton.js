import React from "react";
import { Button, Spinner } from "react-bootstrap";

const CustomButton = (props) => {
  return (
    <React.Fragment>
      <Button
        className={props.className}
        style={props.style}
        onClick={props.onClick}
        type={props.type}
        variant={props.variant}
        as={props.as}
        to={props.to}
        target={props.target}
      >
        {props.loading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          props.children
        )}
      </Button>
    </React.Fragment>
  );
};

export default CustomButton;
