// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { updatePassword } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

// For to update password in account page
class UpdatePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
    errors: {}
  };

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs clear after 6 seconds
  componentWillReceiveProps(nextProps) {
    if (this.state.submitting && nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Update the password
  onUpdatePassword = async (e) => {
    e.preventDefault();

    if (this.props.errors) {
      this.props.clearErrors();
    }

    this.setState({ submitting: true, disableSubmitButton: true });

    const passwordData = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm,
    };

    await this.props.updatePassword(passwordData);

    this.setState({ submitting: false, disableSubmitButton: false });

    if (Object.keys(this.state.errors).length === 0) {
      this.setState({ submitted: true });
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    let errors = [];

    if (Object.keys(this.state.errors).length > 0) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {this.state.submitted ? (
          <Alert type="success" message="Update successful!" />
        ) : null}
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <form
          className="form form-user-settings"
          onSubmit={this.onUpdatePassword}
        >
          <h2 className="heading-secondary heading-secondary--small ma-bt-md">
            Password Change
          </h2>
          <InputGroup
            type="password"
            name="currentPassword"
            id="currentPassword"
            placeholder="Current password"
            value={this.state.currentPassword}
            minLength="8"
            required={true}
            onChange={(e) => this.handleChange(e)}
            htmlFor="currentPassword"
            label="Current password"
          />
          <InputGroup
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="New password"
            value={this.state.newPassword}
            minLength="8"
            required={true}
            onChange={(e) => this.handleChange(e)}
            htmlFor="newPassword"
            label="New password"
          />
          <InputGroup
            type="password"
            name="newPasswordConfirm"
            id="newPasswordConfirm"
            placeholder="Confirm new password"
            value={this.state.newPasswordConfirm}
            minLength="8"
            required={true}
            onChange={(e) => this.handleChange(e)}
            htmlFor="newPasswordConfirm"
            label="Confirm new password"
          />
          <div className="form__group right">
            <button
              type="submit"
              className="btn-small btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitting
                ? "Update password"
                : "Updating password..."}
            </button>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

UpdatePassword.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { updatePassword, clearErrors })(
  UpdatePassword
);
