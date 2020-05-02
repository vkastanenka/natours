// React
import React from "react";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";
import Navbar from "../../components/Layout/Navbar";
import TourCardOverview from "./Layout/TourCardOverview";

const ToursOverview = () => {
  return (
    <Auxiliary>
      <Navbar />
      <main className="main">
        <div className="card-container">
          <TourCardOverview />
          <TourCardOverview />
          <TourCardOverview />
          <TourCardOverview />
          <TourCardOverview />
          <TourCardOverview />
        </div>
      </main>
    </Auxiliary>
  );
};

export default ToursOverview;
