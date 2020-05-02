// React
import React, { Component } from "react";

// Components
import InputGroup from "../../components/Inputs/InputGroup";

class Authenticate extends Component {
  state = {
    loginEmail: "",
    loginPassword: "",
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPasswordConfirm: "",
    isRegistered: true,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let formContent = (
      <div className="authenticate-form">
        <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
          Log into your account
        </h2>
        <form className="form">
          <InputGroup
            type="email"
            name="loginEmail"
            id="loginEmail"
            placeholder="Email address"
            value={this.state.loginEmail}
            required={true}
            onChange={(e) => this.handleChange(e)}
            htmlFor="loginEmail"
            label="Email address"
          />
          <InputGroup
            type="password"
            name="loginPassword"
            id="loginPassword"
            placeholder="Password"
            value={this.state.loginPassword}
            required={true}
            onChange={(e) => this.handleChange(e)}
            htmlFor="loginPassword"
            label="Password"
          />
          <div className="form__group">
            <button className="btn btn--green">Login</button>
          </div>
        </form>
      </div>
    );

    if (!this.state.isRegistered) {
      formContent = (
        <div className="authenticate-form">
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            Register your account
          </h2>
          <form className="form">
            <InputGroup
              type="text"
              name="registerName"
              id="registerName"
              placeholder="Full name"
              value={this.state.registerName}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="registerName"
              label="Full name"
            />
            <InputGroup
              type="email"
              name="registerEmail"
              id="registerEmail"
              placeholder="Email address"
              value={this.state.registerEmail}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="registerEmail"
              label="Email address"
            />
            <InputGroup
              type="password"
              name="registerPassword"
              id="registerPassword"
              placeholder="Password"
              value={this.state.registerPassword}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="registerPassword"
              label="Password"
            />
            <InputGroup
              type="password"
              name="registerPasswordConfirm"
              id="registerPasswordConfirm"
              placeholder="Confirm Password"
              value={this.state.registerPasswordConfirm}
              required={true}
              onChange={(e) => this.handleChange(e)}
              htmlFor="registerPasswordConfirm"
              label="Confirm Password"
            />
            <div className="form__group">
              <button className="btn btn--green">Register</button>
            </div>
          </form>
        </div>
      );
    }

    return <main className="main">{formContent}</main>;
  }
}

export default Authenticate;
