// React
import React from "react";
import PropTypes from "prop-types";

const Story = props => {
  return (
    <div className="story">
      <figure className="story__shape">
        <img
          src={props.imgURL}
          alt="Person on a tour"
          className="story__img"
        />
        <figcaption className="story__caption">{props.name}</figcaption>
      </figure>
      <div className="story__text">
        <h3 className="heading-tertiary ma-bt-sm">
          {props.title}
        </h3>
        <p>
          {props.story}
        </p>
      </div>
    </div>
  );
};

Story.propTypes = {
  
}

export default Story;
