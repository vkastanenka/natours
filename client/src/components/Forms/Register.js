// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { register } from "../../store/actions/authActions";

// Components
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    registering: false,
    disableRegisterButton: false,
    justRegistered: false,
  };

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to register a new user
  onRegisterSubmit = async (e) => {
    e.preventDefault();

    // 1. State to change button text
    this.setState({ registering: true, disableRegisterButton: true });

    // 2. User data to post
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    // 3. Register new user in the DB
    await this.props.register(newUser);

    // 4. State to revert form and cta to login page
    if (Object.keys(this.props.errors).length > 0) {
      this.setState({
        registering: false,
        disableRegisterButton: false,
      });
    } else {
      this.setState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        registering: false,
        disableRegisterButton: false,
        justRegistered: true,
      });
    }
  };

  render() {
    return (
      <Auxiliary>
        <form className="form" onSubmit={this.onRegisterSubmit}>
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            {!this.state.justRegistered
              ? "Register your account"
              : "Thank you for joining us!"}
          </h2>
          <InputGroup
            type="text"
            name="name"
            id="name"
            placeholder="Full name"
            value={this.state.name}
            required={true}
            onChange={(e) => this.onChange(e)}
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
            onChange={(e) => this.onChange(e)}
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
            onChange={(e) => this.onChange(e)}
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
            onChange={(e) => this.onChange(e)}
            htmlFor="passwordConfirm"
            label="Confirm Password"
          />
          <div className="form__group">
            {!this.state.justRegistered ? (
              <button
                type="submit"
                className="btn btn--green"
                disabled={this.state.disableRegisterButton}
              >
                {!this.state.registering ? "Register" : "Registering..."}
              </button>
            ) : null}
          </div>
        </form>
        {this.state.justRegistered ? (
          <button className="btn btn--green">
            <Link to="/authenticate/login" className='link-style'>
              Redirect to login
            </Link>
          </button>
        ) : null}
      </Auxiliary>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { register })(Register);
