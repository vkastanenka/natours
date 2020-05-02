// React
import React from "react";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import Header from "./Layout/Header";
import Description from "./Layout/Description";
import Pictures from "./Layout/Pictures";
import Map from "./Layout/Map";
import Reviews from "./Layout/Reviews";
import CTA from "./Layout/CTA";

const Tour = () => {
  return (
    <PageLayout>
      <main className="main">
        <Header />
        <Description />
        <Pictures />
        <Map />
        <Reviews />
        <CTA />
      </main>
    </PageLayout>
  );
};

export default Tour;
