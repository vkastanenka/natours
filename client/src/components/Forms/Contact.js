// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

class Contact extends Component {
  state = {
    name: "",
    email: "",
    emailBody: "",
    submittingEmail: false,
    disableSubmitButton: false,
    errors: {},
  };

  // If authenticated, auto-fill name and email fields
  componentDidMount() {
    const { authenticated, user } = this.props.auth;
    if (authenticated) {
      this.setState({ name: user.name, email: user.email });
    }
  }

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        submittingEmail: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    this.timer = null;
    clearTimeout(this.timer);
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form action="#" class="form">
        <div class="ma-bt-md">
          <h2 class="heading-secondary heading-secondary--large">
            Contact Natours
          </h2>
        </div>
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
        <TextAreaGroup
          name="emailBody"
          id="emailBody"
          inputClass="form__textarea"
          placeholder="Write your email here"
          value={this.state.emailBody}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="emailBody"
          label="Contact Body"
        />
        <div class="form__group">
          <button type="submit" class="btn btn--green">
            Submit Email
          </button>
        </div>
      </form>
    );
  }
}

Contact.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Contact);
