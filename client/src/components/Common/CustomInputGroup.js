import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const CustomInputGroup = (props) => {
  return (
    <React.Fragment>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text
            style={{
              ...{
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              },
              ...props.textStyle,
            }}
            className={props.textClassName}
          >
            <i className={props.icon}></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          style={{
            ...{
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
            },
            ...props.inputStyle,
          }}
          className={
            "form-input " + props.inputClassName ? props.inputClassName : ""
          }
          type={props.type}
          placeholder={props.placeholder}
          name={props.name}
          isInvalid={props.isInvalid}
          autoComplete={props.autoComplete}
          ref={props.referance}
        />
        <Form.Control.Feedback type={props.messageType}>
          {props.message}
        </Form.Control.Feedback>
      </InputGroup>
    </React.Fragment>
  );
};

export default CustomInputGroup;
