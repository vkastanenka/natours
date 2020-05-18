// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
// import { deleteUser } from "../../store/actions/reviewActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import Auxiliary from "../../components/HigherOrder/Auxiliary";

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
            onClick={() => this.setState({ deletingReview: true })}
            className="icon icon--large icon--active icon--black-primary icon--translate"
          />
        </div>
      );
    }

    if (this.state.deletingReview) {
      alert = (
        <Alert
          type="error"
          message="Are you sure you want to delete this user? All information associated with them will be deleted!"
          prompt={true}
          deleteId={this.props.userId}
          function={this.props.deleteUser}
          alertClose={() => this.setState({ deletingReview: false })}
        />
      );
    }

    return (
      <Auxiliary>
        {alert}
        <div className={`user__card ${this.props.cardClassName}`}>
          {icons}
          <div className="user__avatar">
            <img
              src={this.props.imageURL}
              alt={this.props.name}
              className="user__avatar-img"
            />
            <h6 className="user__user">{this.props.name}</h6>
            <h6 className="user__user">{this.props.email}</h6>
          </div>
          <p className="user__text">{this.props.active ? "Active" : "Inactive"}</p>
          <p className="user__text">{this.props.role}</p>
        </div>
      </Auxiliary>
    );
  }
}

export default UserCard;
