// React
import React, { Component } from "react";

// Components
import InputGroup from "../Inputs/InputGroup";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form className="form">
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
        <div className="form__group">
          <button className="btn btn--green">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
