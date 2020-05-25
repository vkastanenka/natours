// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";
import Alert from "../Alert/Alert";
import Popup from "../HigherOrder/Popup";
import TourForm from "../Forms/Tour";
import Auxiliary from "../HigherOrder/Auxiliary";

// Tour card for tours in the DB
class TourCard extends Component {
  state = {
    editingTour: false,
    deletingTour: false,
  };

  render() {
    let icons;
    let popup;
    let alert;

    if (this.props.page === "manageTours") {
      icons = (
        <div className="card__icons">
          <Icon
            type="edit"
            onClick={() => this.setState({ editingTour: true })}
            className="icon icon--large icon--active icon--white-primary icon--translate"
          />
          <Icon
            type="x"
            onClick={() => this.setState({ deletingTour: true })}
            className="icon icon--large icon--active icon--white-primary icon--translate"
          />
        </div>
      );
    }

    if (this.state.editingTour) {
      popup = (
        <Popup>
          <TourForm
            popupClose={() => this.setState({ editingTour: false })}
            editingTour={true}
            tourInfo={this.props.tour}
          />
        </Popup>
      );
    }

    if (this.state.deletingTour) {
      alert = (
        <Alert
          type="error"
          message="Are you sure you want to delete this tour?"
          prompt={true}
          tourId={this.props.tourId}
          function={this.props.deleteTour}
          alertClose={() => this.setState({ deletingTour: false })}
        />
      );
    }

    return (
      <Auxiliary>
        {popup}
        {alert}
        <div className="card">
          {icons}
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src={this.props.imageURL}
                alt={`${this.props.name} cover`}
                className="card__picture-img"
              />
            </div>
            <h3 className="card__heading">
              <span>{this.props.name}</span>
            </h3>
            {this.props.iconClose ? (
              <Icon
                type="x-circle"
                className="card__close-icon icon icon--large icon--white-primary icon--active icon--translate"
                onClick={this.props.iconClose}
              />
            ) : null}
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">{this.props.duration}</h4>
            <p className="card__text">{this.props.summary}</p>
            <div className="card__data">
              <Icon type="map-pin" className="card__icon" />
              <span>{this.props.startLocation}</span>
            </div>
            <div className="card__data">
              <Icon type="calendar" className="card__icon" />
              <span>{this.props.date}</span>
            </div>
            <div className="card__data">
              <Icon type="flag" className="card__icon" />
              <span>{this.props.stops}</span>
            </div>
            <div className="card__data">
              <Icon type="user" className="card__icon" />
              <span>{this.props.participants}</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">{`$${this.props.price}`}</span>
              <span className="card__footer-text"> per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">
                {this.props.ratingsAverage}
              </span>
              <span className="card__footer-text">{` rating (${this.props.ratingsQuantity})`}</span>
            </p>
            <button className="btn btn--green btn--small">
              <Link to={`/tour/${this.props.slug}`} className="link-style">
                Details
              </Link>
            </button>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

TourCard.propTypes = {
  page: PropTypes.string,
  tour: PropTypes.object,
  tourId: PropTypes.string,
  imageURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  startLocation: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.string.isRequired,
  participants: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ratingsAverage: PropTypes.number.isRequired,
  ratingsQuantity: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TourCard;
