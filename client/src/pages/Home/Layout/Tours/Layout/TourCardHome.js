// React
import React from "react";
import PropTypes from "prop-types";

const TourCardHome = (props) => {
  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div className={`card__picture card__picture--${props.pictureNumber}`}>
          &nbsp;
        </div>
        <h4 className="card__heading">
          <span
            className={`card__heading-span card__heading-span--${props.headingNumber}`}
          >
            {props.heading}
          </span>
        </h4>
        <div className="card__details">
          <ul>
            <li>{`${props.numDays} day tours`}</li>
            <li>{`Up to ${props.numPeople} people`}</li>
            <li>{`${props.numGuides} tour guides`}</li>
            <li>{`Sleep in ${props.accomodations}`}</li>
            <li>{`Difficulty: ${props.difficulty}`}</li>
          </ul>
        </div>
      </div>
      <div
        className={`card__side card__side--back card__side--back-${props.backNumber}`}
      >
        <div className="card__cta">
          <div className="card__price-box">
            <p className="card__price-only">Only</p>
            <p className="card__price-value">{`$${props.price}`}</p>
          </div>
          <a href="#popup" className="btn btn--white">
            Book now!
          </a>
        </div>
      </div>
    </div>
  );
};

TourCardHome.propTypes = {
  pictureNumber: PropTypes.string.isRequired,
  headingNumber: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  numDays: PropTypes.string.isRequired,
  numPeople: PropTypes.string.isRequired,
  numGuides: PropTypes.string.isRequired,
  accomodations: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  backNumber: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
}

export default TourCardHome;
