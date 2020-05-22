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

class UpdateAccount extends Component {
  state = {
    name: "",
    email: "",
    photo: "",
    submitting: false,
    submitted: false,
    disableSubmitButton: false,
  };

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
    if (nextProps.errors) {
      this.setState({
        submitted: false,
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
    clearTimeout(this.timer);
  }

  // State handler for input fields
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // State handler for photo upload
  handlePhoto = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onUpdateAccount = async (e) => {
    e.preventDefault();

    if (this.props.errors) {
      this.props.clearErrors();
    }

    this.setState({ submitted: true, disableSubmitButton: true });

    const form = new FormData();
    form.append("name", this.state.name);
    form.append("email", this.state.email);

    if (this.state.photo) {
      form.append("photo", this.state.photo);
    }

    await this.props.updateCurrentUser(form);

    this.setState({ submitted: false, disableSubmitButton: false });

    if (Object.keys(this.props.errors).length === 0) {
      this.setState({ submitting: true });
      this.timer = setTimeout(() => {
        this.setState({ submitting: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  tryRequirePhoto = () => {
    try {
      return require(`../../assets/images/users/${this.props.auth.user.photo}`);
    } catch (err) {
      return require('../../assets/images/users/default.jpg');
    }
  };

  render() {
    let errors = [];

    if (this.props.errors) {
      for (let err in this.props.errors) {
        errors.push(<p key={err}>{this.props.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {this.state.submitting ? (
          <Alert type="success" message="Update successful!" />
        ) : null}
        {Object.keys(this.props.errors).length > 0 ? (
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
            {/* eslint-disable-next-line */}
            <img
              src={this.tryRequirePhoto()}
              alt="User Photo"
              className="form__user-photo"
            />
            <label htmlFor="photo" className="btn-text">
              Choose new photo
            </label>
            <input
              id="photo"
              type="file"
              name="photo"
              className="invisible"
              onChange={(e) => this.handlePhoto(e)}
            />
          </div>
          <div className="form__group right">
            <button
              type="submit"
              className="btn-small btn--green"
              disabled={this.state.disableSubmitButton}
            >
              {!this.state.submitted
                ? "Save settings"
                : "Saving settings..."}
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
