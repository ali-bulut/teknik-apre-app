import React from "react";

import "../../styles/Common/main.css";

const MainPanel = (props) => {
  return (
    <div
      style={{
        ...{ paddingLeft: 22, marginTop: 120, paddingRight: 22 },
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default MainPanel;
