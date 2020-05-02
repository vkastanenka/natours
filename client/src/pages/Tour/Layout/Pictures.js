import React from "react";

const Pictures = () => {
  return (
    <section className="section-pictures">
      <div className="picture-box">
        <img
          src={require("../../../assets/images/tours/tour-5-1.jpg")}
          alt="The Park Camper Tour 1"
          className="picture-box__img picture-box__img--1"
        />
      </div>
      <div className="picture-box">
        <img
          src={require("../../../assets/images/tours/tour-5-2.jpg")}
          alt="The Park Camper Tour 2"
          className="picture-box__img picture-box__img--2"
        />
      </div>
      <div className="picture-box">
        <img
          src={require("../../../assets/images/tours/tour-5-3.jpg")}
          alt="The Park Camper Tour 3"
          className="picture-box__img picture-box__img--3"
        />
      </div>
    </section>
  );
};

export default Pictures;
