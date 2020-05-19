// React
import React from "react";
import { Link } from "react-router-dom";

// Components
import TourCardRotate from "../../../components/Cards/TourCardRotate";

const Tours = () => {
  return (
    <section className="section-tours" id="section-tours">
      <div className='ma-bt-lg'>
        <h2 className="heading-secondary heading-secondary--large">
          Most popular tours
        </h2>
      </div>

      <div className="card-grid ma-bt-xlg">
        <TourCardRotate
          pictureNumber="1"
          headingNumber="1"
          heading="The Sea Explorer"
          numDays="7"
          numPeople="15"
          numGuides="2"
          accomodations="cozy hotels"
          difficulty="easy"
          backNumber="1"
          price="497"
          linkTo='/tour/the-sea-explorer'
        />
        <TourCardRotate
          pictureNumber="2"
          headingNumber="2"
          heading="The Forest Hiker"
          numDays="5"
          numPeople="25"
          numGuides="3"
          accomodations="provided tents"
          difficulty="medium"
          backNumber="2"
          price="397"
          linkTo='/tour/the-forest-hiker'
        />
        <TourCardRotate
          pictureNumber="3"
          headingNumber="3"
          heading="The Snow Adventurer"
          numDays="4"
          numPeople="10"
          numGuides="3"
          accomodations="provided tents"
          difficulty="hard"
          backNumber="3"
          price="997"
          linkTo='/tour/the-snow-adventurer'
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
