import React from "react";
import logo from "../../assets/img/coming-soon.gif";

const HomePage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img style={{ width: 600 }} src={logo} alt="Coming Soon..." />
    </div>
  );
};

export default HomePage;
