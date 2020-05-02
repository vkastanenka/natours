// React
import React from "react";

// Components
import FeatureBox from "./Layout/FeatureBox";

// Features section of home page
const Features = () => {
  return (
    <section className="section-features">
      <div className="row">
        <div className="col-1-of-4">
          <FeatureBox
            icon="world"
            heading="Explore the world"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
          />
        </div>

        <div className="col-1-of-4">
          <FeatureBox
            icon="compass"
            heading="Meet nature"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
          />
        </div>

        <div className="col-1-of-4">
          <FeatureBox
            icon="map"
            heading="Find your way"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
          />
        </div>

        <div className="col-1-of-4">
          <FeatureBox
            icon="heart"
            heading="Live a healthier life"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
