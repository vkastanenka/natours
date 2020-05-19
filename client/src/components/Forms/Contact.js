// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { sendContactEmail } from "../../store/actions/userActions";
import { clearErrors } from "../../store/actions/errorActions";

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
    submittedEmail: false,
    disableSubmitButton: false,
    errors: {},
  };

  // If authenticated, auto-fill name and email fields
  componentDidMount() {
    console.log(this.state.name);
    console.log(this.state.submittingEmail);
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

  // Sends email from the form
  onSubmitEmail = async (e) => {
    e.preventDefault();

    // Clear errors if any
    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    // 1. State to change button text
    this.setState({
      submittingEmail: true,
      disableSubmitButton: true,
    });

    if (this.state.submittedReview) {
      this.setState({ submittedReview: false });
    }

    // 2. Email data to send
    const emailData = {
      name: this.state.name,
      email: this.state.email,
      emailBody: this.state.emailBody,
    };

    // 3. Send email
    await this.props.sendContactEmail(emailData);

    // 4. Show alert that it worked
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        review: "",
        submittedEmail: true,
        submittingEmail: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.setState({ submittedEmail: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    const errors = [];
    let buttonText = "Submit email";

    if (Object.keys(this.state.errors).length > 0) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    if (this.state.submittingEmail) {
      buttonText = "Submitting email...";
    } else if (this.state.submittedEmail) {
      buttonText = "Submitted email!";
    }

    return (
      <Auxiliary>
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <form onSubmit={this.onSubmitEmail} class="form">
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
              {buttonText}
            </button>
          </div>
        </form>
      </Auxiliary>
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

export default connect(mapStateToProps, { sendContactEmail, clearErrors })(
  Contact
);
