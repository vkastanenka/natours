// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { login, sendPasswordResetToken } from "../../store/actions/authActions";

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
    forgotPassword: false,
    sendingToken: false,
    disableTokenButton: false,
    sentToken: false,
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    // Let user know request is happening / finished
    if (nextProps.auth.loading && !this.state.forgotPassword) {
      this.setState({
        loggingIn: true,
        disableLoginButton: true,
      });
      // If request finishes and errors
    } else if (
      !this.state.forgotPassword &&
      !nextProps.auth.loading &&
      Object.keys(nextProps.errors).length > 0
    ) {
      this.setState({
        loggingIn: false,
        disableLoginButton: false,
      });

      // Clear errors after 6 seconds
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    // Let user know request is happening / finished
    if (nextProps.auth.loading && this.state.forgotPassword) {
      this.setState({
        sendingToken: true,
        disableTokenButton: true,
      });
      // If request finishes and errors
    } else if (
      this.state.forgotPassword &&
      !nextProps.auth.loading &&
      Object.keys(nextProps.errors).length > 0
    ) {
      this.setState({
        sendingToken: false,
        disableTokenButton: false,
      });

      // Clear errors after 6 seconds
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to login a new user
  onLoginSubmit = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // Change forgot password to make sure errors work for login
    if (this.state.forgotPassword) {
      this.setState({ forgotPassword: false });
    }

    // 1. User data to post
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // 2. Login user
    await this.props.login(userData);
  };

  // Send password reset token to reset password
  onSendPasswordResetToken = async (e) => {
    e.preventDefault();
    console.log(this.state.email);

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // 1. Send token
    await this.props.sendPasswordResetToken({ email: this.state.email });

    // 2. Let user know it was a success
    if (Object.keys(this.props.errors).length === 0) {
      this.setState({
        sendingToken: false,
        sentToken: true,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({
          sentToken: false,
          forgotPassword: false,
          disableTokenButton: false,
        });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    const errors = [];
    if (Object.keys(this.props.errors).length > 0) {
      for (let err in this.props.errors) {
        errors.push(<p key={err}>{this.props.errors[err]}</p>);
      }
    }

    let passResetText = "Email password reset token";
    if (this.state.sendingToken) {
      passResetText = "Emailing password reset token...";
    } else if (this.state.sentToken) {
      passResetText = "Check email for token";
    }
    return (
      <Auxiliary>
        {Object.keys(this.props.errors).length > 0 ? (
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
          <div className="form__group flex flex__center ma-bt-lg">
            {!this.state.forgotPassword ? (
              <button
                className="btn-text"
                onClick={() => this.setState({ forgotPassword: true })}
              >
                Forgot your password?
              </button>
            ) : (
              <button
                className="btn-text"
                onClick={this.onSendPasswordResetToken}
              >
                {passResetText}
              </button>
            )}
          </div>
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  sendPasswordResetToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  login,
  clearErrors,
  sendPasswordResetToken,
})(Login);
