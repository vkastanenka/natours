// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../../../components/Icon/Icon";

const Description = (props) => {
  const guides = props.guides.map((guide) => {
    let role;
    if (guide.role === "lead-guide") role = "Lead guide";
    else if (guide.role === "guide") role = "Tour guide";

    return (
      <div className="overview-box__detail" key={guide._id}>
        {/* eslint-disable-next-line */}
        <img
          src={require(`../../../assets/images/users/${guide.photo}`)}
          alt={`Photo of ${guide.name}`}
          className="overview-box__img"
        />
        <span className="overview-box__label">{role}</span>
        <span className="overview-box__text">{`${guide.name}`}</span>
      </div>
    );
  });

  return (
    <section className="section-description">
      <div className="overview-box">
        <div className="overview-box__group">
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            Quick Facts
          </h2>
          <div className="overview-box__detail">
            <Icon className="overview-box__icon" type="calendar" />
            <span className="overview-box__label">Next date</span>
            <span className="overview-box__text">{`${props.nextDate.toLocaleString(
              "default",
              {
                month: "long",
              }
            )} ${props.nextDate.getFullYear()}`}</span>
          </div>
          <div className="overview-box__detail">
            <Icon className="overview-box__icon" type="trending-up" />
            <span className="overview-box__label">Difficulty</span>
            <span className="overview-box__text">{props.difficulty}</span>
          </div>
          <div className="overview-box__detail">
            <Icon className="overview-box__icon" type="user" />
            <span className="overview-box__label">Participants</span>
            <span className="overview-box__text">{`${props.maxGroupSize} people`}</span>
          </div>
          <div className="overview-box__detail">
            <Icon className="overview-box__icon" type="star" />
            <span className="overview-box__label">Rating</span>
            <span className="overview-box__text">{`${props.ratingsAverage} / 5`}</span>
          </div>
        </div>

        <div className="overview-box__group">
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            Your Tour Guides
          </h2>
          {guides}
        </div>
      </div>
      <div className="description-box">
        <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
          {`About ${props.name} Tour`}
        </h2>
        <p className="description__text">{props.description[0]}</p>
        <br />
        <p className="description__text">{props.description[1]}</p>
      </div>
    </section>
  );
};

Description.propTypes = {
  nextDate: PropTypes.instanceOf(Date).isRequired,
  difficulty: PropTypes.string.isRequired,
  maxGroupSize: PropTypes.number.isRequired,
  ratingsAverage: PropTypes.number.isRequired,
  guides: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
};

export default Description;
