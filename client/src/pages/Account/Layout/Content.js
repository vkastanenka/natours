// React
import React, { Component } from "react";

// Components
import InputGroup from "../../../components/Inputs/InputGroup";

class Content extends Component {
  state = {
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="user-view__content">
        <div className="user-view__form-container">
          <form className="form form-user-data">
            <h2 className="heading-secondary heading-secondary--small ma-bt-md">
              Your account settings
            </h2>
            <InputGroup
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              value={this.state.name}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="name"
              label="Full name"
            />
            <InputGroup
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              value={this.state.email}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="email"
              label="Email address"
            />
            <div className="form__group form__photo-upload">
              <img
                src={require("../../../assets/images/users/default.jpg")}
                alt="User Photo"
                className="form__user-photo"
              />
              <button className="btn-text">Choose new photo</button>
            </div>
            <div className="form__group right">
              <button className="btn-small btn--green">Save settings</button>
            </div>
          </form>
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
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
        </div>
      </div>
    );
  }
}

export default Content;
