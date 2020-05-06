// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";

const Navbar = (props) => {
  let navUser = (
    <Auxiliary>
      <p className="navbar__el" onClick={() => props.isRegistered()}>
        Log in
      </p>
      <p
        className="navbar__el navbar__el--cta"
        onClick={() => props.isNotRegistered()}
      >
        Register
      </p>
    </Auxiliary>
  );

  return (
    <header className="header-tour">
      <nav className="navbar navbar--tours">
        <Link to="/tours" className="navbar__el">
          All tours
        </Link>
        <div className="header-tour__logo">
          <img
            src={require("../../assets/images/logo-white.png")}
            alt="Natours Logo"
          />
        </div>
      </nav>
      <nav className="navbar--user">{navUser}</nav>
    </header>
  );
};

Navbar.propTypes = {
  isRegistered: PropTypes.func.isRequired,
  isNotRegistered: PropTypes.func.isRequired,
};

export default Navbar;
