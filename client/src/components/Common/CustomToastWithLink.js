import React from "react";
import { Link } from "react-router-dom";

const CustomToastWithLink = ({ url, text }) => {
  return (
    <div>
      <Link style={{ color: "white" }} to={url}>
        {text}
      </Link>
    </div>
  );
};

export default CustomToastWithLink;
