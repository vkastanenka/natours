// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

// Form for registering new users
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

  // Binding timer to component instance
  timer = null;

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    // Let user know request is happening / finished
    if (nextProps.auth.loading) {
      this.setState({
        registering: true,
        disableRegisterButton: true,
      });
      // If request finishes and errors
    } else if (
      !nextProps.auth.loading &&
      Object.keys(nextProps.errors).length > 0
    ) {
      this.setState({
        registering: false,
        disableRegisterButton: false,
      });

      // Clear errors after 6 seconds
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Make a post request to register a new user
  onRegisterSubmit = async (e) => {
    e.preventDefault();

    // Clear errors if any before submitting
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
    }

    // 1. User data to post
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };

    // 2. Register new user in the DB
    await this.props.register(newUser);

    // 3. Let user know it was a success
    if (Object.keys(this.props.errors).length === 0) {
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
    const errors = [];
    if (Object.keys(this.props.errors).length > 0) {
      for (let err in this.props.errors) {
        errors.push(<p key={err}>{this.props.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {Object.keys(this.props.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
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
          {!this.state.justRegistered ? (
            <div className="form__group">
              <button
                type="submit"
                className="btn btn--green"
                disabled={this.state.disableRegisterButton}
              >
                {!this.state.registering ? "Register" : "Registering..."}
              </button>
            </div>
          ) : null}
        </form>
        {this.state.justRegistered ? (
          <button className="btn btn--green">
            <Link to="/authenticate/login" className="link-style">
              Redirect to login
            </Link>
          </button>
        ) : null}
      </Auxiliary>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
