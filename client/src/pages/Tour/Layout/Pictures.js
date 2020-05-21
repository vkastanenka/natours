// React
import React from "react";
import PropTypes from "prop-types";

// Picture gallery for tour page
const Pictures = (props) => {
  return (
    <section className="section-pictures">
      <div className="picture-box">
        {/* eslint-disable-next-line */}
        <img
          src={require(`../../../assets/images/tours/${props.images[0]}`)}
          alt="Tour Image 1"
          className="picture-box__img picture-box__img--1"
        />
      </div>
      <div className="picture-box">
        {/* eslint-disable-next-line */}
        <img
          src={require(`../../../assets/images/tours/${props.images[1]}`)}
          alt="Tour Image 2"
          className="picture-box__img picture-box__img--2"
        />
      </div>
      <div className="picture-box">
        {/* eslint-disable-next-line */}
        <img
          src={require(`../../../assets/images/tours/${props.images[2]}`)}
          alt="Tour Image 3"
          className="picture-box__img picture-box__img--3"
        />
      </div>
    </section>
  );
};

Pictures.propTypes = {
  images: PropTypes.array.isRequired,
};

export default Pictures;
