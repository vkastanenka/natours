// React
import React from "react";
import { Link } from "react-router-dom";

// Components
import TourCardRotate from "../../../components/Cards/TourCardRotate";

const Tours = () => {
  return (
    <section className="section-tours" id="section-tours">
      <div>
        <h2 className="heading-secondary heading-secondary--large">
          Most popular tours
        </h2>
      </div>

      <div className="card-grid">
        <TourCardRotate
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
        <TourCardRotate
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
        <TourCardRotate
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

      <div>
        <Link to="/tours">
          <button className="btn btn--green">Discover all tours</button>
        </Link>
      </div>
    </section>
  );
};

export default Tours;
