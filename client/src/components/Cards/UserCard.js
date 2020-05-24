// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { deleteUser } from "../../store/actions/userActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import Auxiliary from "../../components/HigherOrder/Auxiliary";

// Card for the site's users
class UserCard extends Component {
  state = {
    deletingUser: false,
  };

  render() {
    let icons;
    let alert;

    if (this.props.page === "manageUsers") {
      icons = (
        <div className="reviews__icons">
          <Icon
            type="x"
            onClick={() => this.setState({ deletingUser: true })}
            className="icon icon--large icon--active icon--black-primary icon--translate"
          />
        </div>
      );
    }

    if (this.state.deletingUser) {
      alert = (
        <Alert
          type="error"
          message="Are you sure you want to delete this user? All information associated with them will be deleted!"
          prompt={true}
          function={() => this.props.deleteUser(this.props.userId)}
          alertClose={() => this.setState({ deletingUser: false })}
        />
      );
    }

    return (
      <Auxiliary>
        {alert}
        <div className={`users__card ${this.props.cardClassName}`}>
          {icons}
          <div className="users__avatar">
            <img
              src={this.props.imageURL}
              alt={this.props.name}
              className="users__avatar-img"
            />
            <h6 className="users__user">{this.props.name}</h6>
            <h6 className="users__user">{this.props.email}</h6>
          </div>
          <p className="users__text">{this.props.role}</p>
        </div>
      </Auxiliary>
    );
  }
}

UserCard.propTypes = {
  cardClassName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default connect(null, { deleteUser })(UserCard);
