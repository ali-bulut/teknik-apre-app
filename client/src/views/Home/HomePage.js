import React from "react";
import logo from "../../assets/img/coming-soon.gif";
import "./HomePage.css";

const HomePage = () => {
  setTimeout(function () {
    const body = document.querySelector(".loading");
    if (body?.classList.contains("loading")) {
      body.classList.remove("loading");
    }
  }, 500);
  return (
    <React.Fragment>
      <link
        href="https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:100,200,300,400"
        rel="stylesheet"
      />
      <div className="loading error-container">
        <div>
          <h1
            className="error-code-header"
            style={{
              fontFamily: "HKBold",
              position: "relative",
              color: "papayawhip",
            }}
          >
            Teknik Apre
          </h1>
          <h2
            className="error-desc-header"
            style={{
              fontFamily: "HKBold",
              position: "relative",
              color: "white",
            }}
          >
            Sitemiz Şu Anda Yapım Aşamasında
          </h2>
          <p
            style={{
              fontFamily: "HKMedium",
              fontSize: 19,
              textAlign: "center",
              position: "relative",
              color: "khaki",
              textShadow: "1px 1px royalblue",
            }}
          >
            Çok yakında açılıyoruz...
          </p>
          <div className="gears">
            <div className="gear one">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="gear two">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <div className="gear three">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
