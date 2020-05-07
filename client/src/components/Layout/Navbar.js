// React
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { logout } from "../../store/actions/authActions";

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

  if (props.auth.authenticated) {
    navUser = (
      <Auxiliary>
        <p className="navbar__el navbar__el--logout" onClick={props.logout}>
          Logout
        </p>
        <Link to="/account" className="navbar__el">
          <img
            src={require(`../../assets/images/users/${props.auth.user.photo}`)}
            alt={`Photo of ${props.auth.user.name}`}
            className="navbar__user-img"
          />
          <span>{props.auth.user.name.split(" ")[0]}</span>
        </Link>
      </Auxiliary>
    );
  }

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
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
