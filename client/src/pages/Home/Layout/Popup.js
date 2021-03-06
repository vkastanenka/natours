// React
import React from "react";
import { Link } from 'react-router-dom';

// Popup for home page with link to tours
const Popup = props => {
  return (
    <div className="popup" id="popup">
      <div className="popup__content">
        <div className="popup__left">
          {/* eslint-disable-next-line */}
          <img
            src={require("../../../assets/images/nat-8.jpg")}
            alt="Tour photo"
            className="popup__img"
          />
          {/* eslint-disable-next-line */}
          <img
            src={require("../../../assets/images/nat-9.jpg")}
            alt="Tour photo"
            className="popup__img"
          />
        </div>
        <div className="popup__right">
          <p className="popup__close" onClick={props.popupClose}>
            &times;
          </p>
          <h2 className="heading-secondary ma-bt-sm">
            Start booking now
          </h2>
          <h3 className="heading-tertiary ma-bt-sm">
            Important &ndash; Please read these terms before booking
          </h3>
          <p className="popup__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed sed
            risus pretium quam. Aliquam sem et tortor consequat id. Volutpat
            odio facilisis mauris sit amet massa vitae. Mi bibendum neque
            egestas congue. Placerat orci nulla pellentesque dignissim enim sit.
            Vitae semper quis lectus nulla at volutpat diam ut venenatis.
            Malesuada pellentesque elit eget gravida cum sociis natoque
            penatibus et. Proin fermentum leo vel orci porta non pulvinar neque
            laoreet. Gravida neque convallis a cras semper. Molestie at
            elementum eu facilisis sed odio morbi quis. Faucibus vitae aliquet
            nec ullamcorper sit amet risus nullam eget. Nam libero justo laoreet
            sit. Amet massa vitae tortor condimentum lacinia quis vel eros
            donec. Sit amet facilisis magna etiam. Imperdiet sed euismod nisi
            porta.
          </p>
          <Link to='/tours' className="btn btn--green">
            Explore our tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;
