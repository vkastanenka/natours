// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { login } from "../../store/actions/authActions";

// Components
import InputGroup from "../Inputs/InputGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
    loggingIn: false,
    disableLoginButton: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.setState({
      email: "",
      password: "",
      loggingIn: false,
      disableLoginButton: false,
    });
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to login a new user
  onLoginSubmit = async (e) => {
    e.preventDefault();

    // 1. State to change button text
    this.setState({ loggingIn: true, disableLoginButton: true });

    // 2. User data to post
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // 3. Login user
    await this.props.login(userData);

    // 4. State to revert form and cta to login page
    if (Object.keys(this.props.errors).length > 0) {
      this.setState({
        loggingIn: false,
        disableLoginButton: false,
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onLoginSubmit}>
        <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
          Log into your account
        </h2>
        <InputGroup
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          value={this.state.email}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="email"
          label="Email address"
        />
        <InputGroup
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="password"
          label="Password"
        />
        <div className="form__group">
          <button
            type="submit"
            className="btn btn--green"
            disabled={this.state.disableLoginButton}
          >
            {!this.state.loggingIn ? "Login" : "Logging In..."}
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { login })(Login);
