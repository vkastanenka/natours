// React
import React, { Component } from "react";

// Components
import FormInputGroup from "../../../components/Forms/FormInputGroup";

class Content extends Component {
  render() {
    return (
      <div className="user-view__content">
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
          <form className="form form-user-data">
            <FormInputGroup
              htmlFor="name"
              label="Name"
              type="text"
              placeholder="Name"
              value="Victoria Kastanenka"
              required={true}
              id="name"
            />
            <FormInputGroup
              groupClass="ma-bt-md"
              htmlFor="email"
              label="Email Address"
              type="email"
              placeholder="Email Address"
              value="admin@natours.io"
              required={true}
              id="email"
            />
            <div className="form__group form__photo-upload">
              <img
                src={require("../../assets/images/users/default.jpg")}
                alt="User Photo"
                className="form__user-photo"
              />
              <button className="btn-text">Choose new photo</button>
            </div>
            <div className="form__group right">
              <button className="btn btn--small btn--green">
                Save settings
              </button>
            </div>
          </form>
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Password Change</h2>
          <form className="form form-user-settings">
            <FormInputGroup
              htmlFor="password-current"
              label="Current Password"
              type="password"
              placeholder="••••••••"
              required={true}
              minLength="8"
              id="password-current"
            />
            <FormInputGroup
              htmlFor="password"
              label="New Password"
              type="password"
              placeholder="••••••••"
              required={true}
              minLength="8"
              id="password"
            />
            <FormInputGroup
              groupClass="ma-bt-lg"
              htmlFor="password-confirm"
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              required={true}
              minLength="8"
              id="password-confirm"
            />
            <div className="form__group right">
              <button className="btn btn--small btn--green">
                Save Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Content;
