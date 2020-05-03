// React
import React from "react";
import { Link } from "react-router-dom";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";

const Navbar = () => {
  let navUser = (
    <Auxiliary>
      <p className="navbar__el">Log in</p>
      <p className="navbar__el navbar__el--cta">Register</p>
    </Auxiliary>
  );

  return (
    <header className="header-tour">
      <nav className="navbar navbar--tours">
        <Link to='/tours' className="navbar__el">All tours</Link>
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

export default Navbar;
