// React
import React from "react";

// Components
import Icon from "../../../components/Icon/Icon";

const Reviews = () => {
  return (
    <section className="section-reviews">
      <div className="reviews">
        <div className="reviews__card">
          <div className="reviews__avatar">
            <img
              src={require("../../../assets/images/users/user-7.jpg")}
              alt="Jim Brown"
              className="reviews__avatar-img"
            />
            <h6 className="reviews__user">Jim Brown</h6>
          </div>
          <p className="reviews__text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            dignissimos sint quo commodi corrupti accusantium veniam saepe
            numquam.
          </p>
          <div className="reviews__rating">
            <Icon type='star' className='reviews__star--active' />
            <Icon type='star' className='reviews__star--active' />
            <Icon type='star' className='reviews__star--active' />
            <Icon type='star' className='reviews__star--active' />
            <Icon type='star' className='reviews__star--active' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
