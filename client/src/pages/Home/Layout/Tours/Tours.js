import React from "react";

import TourCardHome from "./Layout/TourCardHome";

const Tours = () => {
  return (
    <section className="section-tours" id="section-tours">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">Most popular tours</h2>
      </div>

      <div className="card-container">
        <TourCardHome
          pictureNumer="1"
          headingNumber="1"
          heading="The Sea Explorer"
          numDays="3"
          numPeople="30"
          numGuides="2"
          accomodation="cozy hotels"
          difficulty="easy"
          backNumber="1"
          price="297"
        />
        <TourCardHome
          pictureNumer="2"
          headingNumber="2"
          heading="The Forest Hiker"
          numDays="7"
          numPeople="40"
          numGuides="6"
          accomodation="provided tents"
          difficulty="medium"
          backNumber="2"
          price="497"
        />
        <TourCardHome
          pictureNumer="3"
          headingNumber="3"
          heading="The Snow Adventurer"
          numDays="5"
          numPeople="15"
          numGuides="3"
          accomodation="provided tents"
          difficulty="hard"
          backNumber="3"
          price="897"
        />
      </div>

      <div className="u-center-text u-margin-top-huge">
        <a href="#" className="btn btn--green">
          Discover all tours
        </a>
      </div>
    </section>
  );
};

export default Tours;
