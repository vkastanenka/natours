// React
import React from "react";
import { Link as ScrollLink } from "react-scroll";

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

          <button class="btn btn--white btn--animated">
            <ScrollLink
              to="section-tours"
              spy={true}
              smooth={true}
              offset={0}
              duration={500}
            >
              Discover our tours
            </ScrollLink>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
