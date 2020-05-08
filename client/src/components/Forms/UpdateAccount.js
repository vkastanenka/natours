// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { updateCurrentUser } from "../../store/actions/authActions";

// Components
import Alert from "../Alert/Alert";
import InputGroup from "../Inputs/InputGroup";
import Auxiliary from "../HigherOrder/Auxiliary";

class UpdateAccount extends Component {
  state = {
    name: "",
    email: "",
    photo: "",
    updatedAccount: false,
    updatingAccount: false,
    disableUpdateButton: false,
  };

  timer = null;

  componentDidMount() {
    this.setState({
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePhoto = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onUpdateAccount = async (e) => {
    e.preventDefault();

    this.setState({ updatingAccount: true, disableUpdateButton: true });

    const form = new FormData();
    form.append("name", this.state.name);
    form.append("email", this.state.email);

    if (this.state.photo) {
      form.append("photo", this.state.photo);
    }

    await this.props.updateCurrentUser(form);

    this.setState({ updatingAccount: false, disableUpdateButton: false });

    if (Object.keys(this.props.errors).length === 0) {
      this.setState({ updatedAccount: true });
      this.timer = setTimeout(() => {
        this.setState({ updatedAccount: false });
        clearTimeout(this.timer);
      }, 6000);
    }
  };

  render() {
    return (
      <Auxiliary>
        {this.state.updatedAccount ? (
          <Alert type="success" message="Update successful!" />
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
            <img
              src={require(`../../assets/images/users/${this.props.auth.user.photo}`)}
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
            <button type="submit" className="btn-small btn--green" disabled={this.state.disableUpdateButton}>
              {!this.state.updatingAccount
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

export default connect(mapStateToProps, { updateCurrentUser })(UpdateAccount);
