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

// Contact form for home page where anyone can send an email to the admin of the site
class Contact extends Component {
  state = {
    name: "",
    email: "",
    emailBody: "",
    submitting: false,
    submitted: false,
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

  // Alerting user of errors / success / progress
  componentWillReceiveProps(nextProps) {
    // Let user know request is happening / finished
    if (this.state.submitting && Object.keys(nextProps.errors).length > 0) {
      this.setState({
        errors: nextProps.errors,
        submitting: false,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    // Clear errors from state when global errors cleared
    if (
      Object.keys(this.state.errors).length > 0 &&
      Object.keys(nextProps.errors).length === 0
    ) {
      clearTimeout(this.timer);
      this.setState({ errors: {} });
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors();
      this.setState({ errors: {} });
    }
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Sends email from the form
  onSubmitEmail = async (e) => {
    e.preventDefault();

    // Clear any errors when resubmitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Clear any success messages when resubmitting
    if (this.state.submitted) this.setState({ submitted: false });

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // Email data to send
    const emailData = {
      name: this.state.name,
      email: this.state.email,
      emailBody: this.state.emailBody,
    };

    // Send email
    await this.props.sendContactEmail(emailData);

    // If successful, alert user
    if (Object.keys(this.state.errors).length === 0) {
      if (this.props.auth.authenticated) {
        this.setState({
          emailBody: "",
          submitting: false,
          submitted: true,
          disableSubmitButton: false,
        });
      } else if (!this.props.auth.authenticated) {
        this.setState({
          name: "",
          email: "",
          emailBody: "",
          submitting: false,
          submitted: true,
          disableSubmitButton: false,
        });
      }

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    // Filling alert with errors if found
    const errors = [];
    if (Object.keys(this.state.errors).length > 0) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {this.state.submitted ? (
          <Alert type="success" message="Email sent!" />
        ) : null}
        {Object.keys(this.props.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <form onSubmit={this.onSubmitEmail} className="form">
          <div className="ma-bt-md">
            <h2 className="heading-secondary heading-secondary--large">
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
            inputClassName="form__textarea"
            placeholder="Write your email here"
            value={this.state.emailBody}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="emailBody"
            label="Contact Body"
          />
          <div className="form__group">
            <button
              type="submit"
              className="btn btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitting ? "Submit email" : "Submitting email..."}
            </button>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

Contact.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  sendContactEmail: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
});

export default connect(mapStateToProps, { sendContactEmail, clearErrors })(
  Contact
);
