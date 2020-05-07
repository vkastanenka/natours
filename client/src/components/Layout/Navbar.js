// React
import React from "react";
import { Link } from "react-router-dom";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";

const Navbar = (props) => {
  let navUser = (
    <Auxiliary>
      <Link to="/authenticate/login" className="navbar__el">
        Login
      </Link>
      <Link to="/authenticate/register" className="navbar__el navbar__el--cta">
        Register
      </Link>
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

export default Navbar;
