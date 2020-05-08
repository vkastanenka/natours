// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { login } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

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

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        loggingIn: false,
        disableLoginButton: false,
      });
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to login a new user
  onLoginSubmit = async (e) => {
    e.preventDefault();

    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    // 1. State to change button text
    this.setState({ loggingIn: true, disableLoginButton: true });

    // 2. User data to post
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // 3. Login user
    await this.props.login(userData);
  };

  render() {
    let errors = [];

    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
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
      </Auxiliary>
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

export default connect(mapStateToProps, { login, clearErrors })(Login);
