// React
import React from "react";

// Header for home page
const Header = () => {
  return (
    <header className="section-header-home">
      <div className="header-home">
        <div className="header-home__logo-box">
          <img
            src={require("../../../assets/images/logo-white.png")}
            alt="Logo"
            className="header-home__logo"
          />
        </div>

        <div className="header-home__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Outdoors</span>
            <span className="heading-primary--sub">is where life happens</span>
          </h1>

          <a href="#section-tours" class="btn btn--white btn--animated">
            Discover our tours
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
