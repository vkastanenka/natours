// React
import React, { Component } from "react";

// Components
import InputGroup from "../Inputs/InputGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="form">
        <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
          Register your account
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
        <InputGroup
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={this.state.password}
          required={true}
          onChange={(e) => this.handleChange(e)}
          htmlFor="password"
          label="Password"
        />
        <InputGroup
          type="password"
          name="passwordConfirm"
          id="passwordConfirm"
          placeholder="Confirm Password"
          value={this.state.passwordConfirm}
          required={true}
          onChange={(e) => this.handleChange(e)}
          htmlFor="passwordConfirm"
          label="Confirm Password"
        />
        <div className="form__group">
          <button className="btn btn--green">Register</button>
        </div>
      </form>
    );
  }
}

export default Register;
