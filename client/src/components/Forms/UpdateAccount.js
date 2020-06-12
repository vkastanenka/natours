// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { updateCurrentUser } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

// Form to update account for every user
class UpdateAccount extends Component {
  state = {
    name: "",
    email: "",
    photo: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
    errors: {},
  };

  // Filling fields on mount
  componentDidMount() {
    this.setState({
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      photo: this.props.auth.user.photo,
    });
  }

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
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

  // Clear any timers / alerts when form unmounts
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

  // State handler for photo upload
  onPhotoChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  // Updating account action
  onUpdateAccount = async (e) => {
    e.preventDefault();

    // Clear any errors when resubmitting
    if (Object.keys(this.props.errors).length > 0) this.props.clearErrors();

    // Clear any success messages when resubmitting
    if (this.state.submitted) this.setState({ submitted: false });

    // Let user know request is happening and disable button
    this.setState({ submitting: true, disableSubmitButton: true });

    // Create the form
    // const form = new FormData();
    // form.append("name", this.state.name);
    // form.append("email", this.state.email);
    // if (this.state.photo) form.append("photo", this.state.photo);
    const form = { name: this.state.name, email: this.state.email };

    // Update the user
    await this.props.updateCurrentUser(form);

    // If successful, alert user
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        submitted: true,
        submitting: false,
        disableSubmitButton: false,
      });

      // Clear success message after 6 seconds
      this.timer = setTimeout(() => {
        this.setState({ submitted: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  // Prevents requiring a photo that doesn't exist
  tryRequirePhoto = () => {
    try {
      return require(`../../assets/images/users/${this.props.auth.user.photo}`);
    } catch (err) {
      return require("../../assets/images/users/default.jpg");
    }
  };

  render() {
    console.log(this.state.name);
    console.log(this.state.email);

    // Filling alert with errors if found
    const errors = [];
    if (this.state.errors.status === "error") {
      errors.push(<p key="error">{this.props.errors.error.error}</p>);
    } else if (Object.keys(this.props.errors).length > 0) {
      for (let err in this.props.errors) {
        errors.push(<p key={err}>{this.props.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {this.state.submitted ? (
          <Alert type="success" message="Update successful!" />
        ) : null}
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <form className="form form-user-data" onSubmit={this.onUpdateAccount}>
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
          <div className="form__group form__photo-upload">
            {/* eslint-disable-next-line */}
            <img
              src={this.tryRequirePhoto()}
              alt="User Photo"
              className="form__user-photo"
            />
            <label htmlFor="photo" className="btn-text">
              Choose new photo (unavailable in production)
            </label>
            <input
              id="photo"
              type="file"
              name="photo"
              className="invisible"
              onChange={(e) => this.onPhotoChange(e)}
            />
          </div>
          <div className="form__group right">
            <button
              type="submit"
              className="btn-small btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitting ? "Save settings" : "Saving settings..."}
            </button>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

UpdateAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateCurrentUser, clearErrors })(
  UpdateAccount
);
