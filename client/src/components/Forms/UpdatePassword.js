// React
import React, { Component } from "react";

// Components
import InputGroup from "../Inputs/InputGroup";

class UpdatePassword extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="form form-user-settings">
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
          <button className="btn-small btn--green">Save Password</button>
        </div>
      </form>
    );
  }
}

export default UpdatePassword;
