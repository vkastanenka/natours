// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";
import { resetPassword } from "../../store/actions/authActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

// Form to reset a user's password
class ResetPassword extends Component {
  state = {
    password: "",
    passwordConfirm: "",
    submitting: false,
    disableSubmitButton: false,
    submitted: false,
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

  // Make a patch request to reset user password
  onPasswordReset = async (e) => {
    e.preventDefault();

    // Clear any errors when resubmitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // Password data to patch
    const passData = {
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    // Password reset token
    const passToken = this.props.match.params.token;

    // Submit patch request
    await this.props.resetPassword(passData, passToken);

    // Let user know it was a success
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        password: "",
        passwordConfirm: "",
        submitting: false,
        disableSubmitButton: false,
        submitted: true,
      });
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
        {Object.keys(this.props.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <form className="form" onSubmit={this.onPasswordReset}>
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            {!this.state.submitted
              ? "Reset your password"
              : "Password reset successful!"}
          </h2>
          <InputGroup
            type="password"
            name="password"
            id="password"
            placeholder="New password"
            value={this.state.password}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="password"
            label="New password"
          />
          <InputGroup
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Confirm new password"
            value={this.state.passwordConfirm}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="passwordConfirm"
            label="Confirm new password"
          />
          {!this.state.submitted ? (
            <div className="form__group">
              <button
                type="submit"
                className="btn btn--green"
                disabled={this.state.disableSubmitButton}
              >
                {!this.state.submitting
                  ? "Reset password"
                  : "Resetting password..."}
              </button>
            </div>
          ) : null}
        </form>
        {this.state.submitted ? (
          <button className="btn btn--green">
            <Link to="/authenticate/login" className="link-style">
              Redirect to login
            </Link>
          </button>
        ) : null}
      </Auxiliary>
    );
  }
}

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { clearErrors, resetPassword })(
  withRouter(ResetPassword)
);
