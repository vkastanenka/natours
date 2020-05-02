// React
import React from "react";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import TourCardOverview from "./Layout/TourCardOverview";

const ToursOverview = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default ToursOverview;
