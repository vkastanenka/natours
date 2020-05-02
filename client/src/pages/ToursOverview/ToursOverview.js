// React
import React from "react";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import TourCardOverview from "./Layout/TourCardOverview";

const ToursOverview = () => {
  const coverForestHiker = (
    <img
      src={require("../../assets/images/tours/tour-1-cover.jpg")}
      alt="Tour 1"
      className="card__picture-img"
    />
  );

  return (
    <PageLayout>
      <main className="main">
        <div className="card-container">
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
          <TourCardOverview
            cover={coverForestHiker}
            name='The Forest Hiker'
            duration='Easy 5 day tour'
            description='Breathtaking hike through the Canadian Banff National Park'
            location='Banff, Canada'
            date='April, 2021'
            stops='3 stops'
            participants='25 people'
            price='297'
            ratingValue='4.9'
            ratingCount='21'
          />
        </div>
      </main>
    </PageLayout>
  );
};

export default ToursOverview;
