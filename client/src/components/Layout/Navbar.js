// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { logout } from "../../store/actions/authActions";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";

class Navbar extends Component {
  tryRequirePhoto = () => {
    try {
      return require(`../../assets/images/users/${this.props.auth.user.photo}`);
    } catch (err) {
      return require("../../assets/images/users/default.jpg");
    }
  };

  render() {
    let navUser = (
      <Auxiliary>
        <Link to="/authenticate/login" className="navbar__el">
          Login
        </Link>
        <Link
          to="/authenticate/register"
          className="navbar__el navbar__el--cta"
        >
          Register
        </Link>
      </Auxiliary>
    );

    if (this.props.auth.authenticated) {
      navUser = (
        <Auxiliary>
          <button
            className="navbar__el navbar__el--logout"
            onClick={this.props.logout}
          >
            Logout
          </button>
          <Link className="navbar__el" to="/account/settings">
            {/* eslint-disable-next-line */}
            <img
              src={this.tryRequirePhoto()}
              alt="User Photo"
              className="navbar__user-img"
            />
            <span>{this.props.auth.user.name.split(" ")[0]}</span>
          </Link>
        </Auxiliary>
      );
    }

    return (
      <header className="header-tour">
        <nav className="navbar navbar--tours">
          <div className="navbar__logo">
            <Link to="/" className="navbar__el">
              <img
                src={require("../../assets/images/logo-white.png")}
                alt="Natours Logo"
              />
            </Link>
          </div>
          <Link to="/tours" className="navbar__el">
            All tours
          </Link>
        </nav>
        <nav className="navbar--user">{navUser}</nav>
      </header>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
