// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

class Navigation extends Component {
  state = {
    active: false,
  };

  render() {
    return (
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
          checked={this.state.active}
        />

        <label
          htmlFor="navi-toggle"
          className="navigation__button"
          onClick={() =>
            this.setState((prevState) => ({ active: !prevState.active }))
          }
        >
          <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <ul className="navigation__list">
            {!this.props.auth.authenticated ? (
              <li className="navigation__item">
                <Link to="/authenticate/login" className="navigation__link">
                  <span>01</span>Login/Register
                </Link>
              </li>
            ) : (
              <li className="navigation__item">
                <Link to="/account/settings" className="navigation__link">
                  <span>01</span>Manage Account
                </Link>
              </li>
            )}
            <li className="navigation__item">
              <ScrollLink to="section-about" duration={0}>
                <p
                  className="navigation__link"
                  onClick={() => this.setState({ active: false })}
                >
                  <span>02</span>About
                </p>
              </ScrollLink>
            </li>
            <li className="navigation__item">
              <ScrollLink to="section-features" duration={0}>
                <p
                  className="navigation__link"
                  onClick={() => this.setState({ active: false })}
                >
                  <span>03</span>Your Benefits
                </p>
              </ScrollLink>
            </li>
            <li className="navigation__item">
              <ScrollLink to="section-tours" duration={0}>
                <p
                  className="navigation__link"
                  onClick={() => this.setState({ active: false })}
                >
                  <span>04</span>Popular Tours
                </p>
              </ScrollLink>
            </li>
            <li className="navigation__item">
              <ScrollLink to="section-stories" duration={0}>
                <p
                  className="navigation__link"
                  onClick={() => this.setState({ active: false })}
                >
                  <span>05</span>Stories
                </p>
              </ScrollLink>
            </li>
            <li className="navigation__item">
              <ScrollLink to="section-contact" duration={0}>
                <p
                  className="navigation__link"
                  onClick={() => this.setState({ active: false })}
                >
                  <span>06</span>Contact
                </p>
              </ScrollLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navigation);
