// React
import React from "react";

// Components
import Story from "../../../components/Story/Story";

const Stories = () => {
  return (
    <section className="section-stories">
      <div className="bg-video">
        <video className="bg-video__content" autoplay muted loop>
          <source
            src={require("../../../assets/images/video.mp4")}
            type="video/mp4"
          />
          <source
            src={require("../../../assets/images/video.webm")}
            type="video/webm"
          />
          Your browser is not supported!
        </video>
      </div>

      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">We make people genuinely happy</h2>
      </div>

      <div className="row">
        <Story
          imgURL={require("../../../assets/images/nat-8.jpg")}
          name="Mary Smith"
          title="I had the best week ever with my family"
          story="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
        ipsum sapiente aspernatur libero repellat quis consequatur ducimus
        quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente
        aspernatur libero repellat quis consequatur ducimus quam nisi
        exercitationem omnis earum qui."
        />
      </div>

      <div className="row">
        <Story
          imgURL={require("../../../assets/images/nat-9.jpg")}
          name="Jack Wilson"
          title="I've never felt such tranquility"
          story="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          ipsum sapiente aspernatur libero repellat quis consequatur ducimus
          quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente
          aspernatur libero repellat quis consequatur ducimus quam nisi
          exercitationem omnis earum qui."
        />
      </div>

      <div className="u-center-text u-margin-top-huge">
        <button className="btn-text">
          Read all stories &rarr;
        </button>
      </div>
    </section>
  );
};

export default Stories;
