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

class UpdatePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
    updatedPassword: false,
    updatingPassword: false,
    disableUpdateButton: false,
    errors: {},
  };

  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpdatePassword = async (e) => {
    e.preventDefault();

    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    this.setState({ updatingPassword: true, disableUpdateButton: true });

    const passwordData = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm,
    };

    await this.props.updatePassword(passwordData);

    this.setState({ updatingPassword: false, disableUpdateButton: false });

    if (Object.keys(this.props.errors).length === 0) {
      this.setState({ updatedPassword: true });
      this.timer = setTimeout(() => {
        this.setState({ updatedPassword: false });
        clearTimeout(this.timer);
      }, 6000);
    }
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
        {this.state.updatedPassword ? (
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
              disabled={this.state.disableUpdateButton}
            >
              {!this.state.updatingPassword
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
