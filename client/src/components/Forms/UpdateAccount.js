// React
import React, { Component } from "react";

// Components
import InputGroup from "../Inputs/InputGroup";

class UpdateAccount extends Component {
  state = {
    name: "",
    email: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="form form-user-data">
        <h2 className="heading-secondary heading-secondary--small ma-bt-md">
          Update account settings
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
            src={require("../../assets/images/users/default.jpg")}
            alt="User Photo"
            className="form__user-photo"
          />
          <button className="btn-text">Choose new photo</button>
        </div>
        <div className="form__group right">
          <button className="btn-small btn--green">Save settings</button>
        </div>
      </form>
    );
  }
}

export default UpdateAccount;
