import React from "react";
import { Spinner } from "react-bootstrap";

const CustomSpinner = (props) => {
  return (
    <Spinner
      animation={props.animation ? props.animation : "grow"}
      role="status"
      size={props.size ? props.size : "lg"}
      style={{
        ...{ color: "#7c4dff", position: "relative", left: "50%" },
        ...props.style,
      }}
    />
  );
};

export default CustomSpinner;
