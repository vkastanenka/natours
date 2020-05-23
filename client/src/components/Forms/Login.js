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

// Login form to log a user into the iste
class Login extends Component {
  state = {
    email: "",
    password: "",
    submitting: false,
    disableSubmitButton: false,
    forgotPassword: false,
    sendingToken: false,
    disableTokenButton: false,
    sentToken: false,
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    if (this.state.submitting && Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors,
        submitting: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    // Clear errors from state when global errors cleared
    if (
      Object.keys(this.state.errors).length > 0 &&
      Object.keys(nextProps.errors).length === 0
    ) {
      clearTimeout(this.timer);
      this.setState({ errors: {} });
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
      this.setState({ errors: {} });
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
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Change forgot password
    if (this.state.forgotPassword) this.setState({ forgotPassword: false });

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // User data to post
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    // Login user
    await this.props.login(userData);
  };

  // Send password reset token to reset password
  onSendPasswordResetToken = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Let user know request is happening and disable button
    this.setState({ sendingToken: true, disableTokenButton: true });

    // Send token
    await this.props.sendPasswordResetToken({ email: this.state.email });

    // If successful, alert user
    if (Object.keys(this.props.errors).length === 0) {
      this.setState({
        sendingToken: false,
        sentToken: true,
        forgotPassword: false,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({
          sentToken: false,
          disableTokenButton: false,
        });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    // Filling alert with errors if found
    const errors = [];
    if (Object.keys(this.state.errors).length > 0) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {this.state.sentToken ? (
          <Alert type="success" message="Success! Check email for token" />
        ) : null}
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
          <div className="form__group flex flex__center ma-bt-lg">
            {!this.state.forgotPassword ? (
              <button
                className="btn-text"
                onClick={() => this.setState({ forgotPassword: true })}
                disabled={this.state.disableTokenButton}
              >
                Forgot your password?
              </button>
            ) : (
              <button
                className="btn-text"
                onClick={this.onSendPasswordResetToken}
                disabled={this.state.disableTokenButton}
              >
                {!this.state.sendingToken
                  ? "Email password reset token"
                  : "Emailing password reset token..."}
              </button>
            )}
          </div>
          <div className="form__group">
            <button
              type="submit"
              className="btn btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitting ? "Login" : "Logging In..."}
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
