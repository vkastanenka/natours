import React from "react";

const About = () => {
  return (
    <section className="section-about">
      <div className="u-center-text u-margin-bottom-big">
        <h2 className="heading-secondary">Exciting tours for adventurous people</h2>
      </div>

      <div className="row">
        <div className="col-1-of-2">
          <h3 className="heading-tertiary u-margin-bottom-small">
            You're going to fall in love with nature
          </h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
            ipsum sapiente aspernatur libero repellat quis consequatur ducimus
            quam nisi exercitationem omnis earum qui.
          </p>

          <h3 className="heading-tertiary u-margin-bottom-small">
            Live adventures like you never have before
          </h3>
          <p className="paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            nulla deserunt voluptatum nam.
          </p>

          <a href="#" className="btn-text">
            Learn more &rarr;
          </a>
        </div>
        <div className="col-1-of-2">
          <div className="composition">
            <img
              srcSet={`${require("../../../assets/images/nat-1.jpg")} 300w, ${require("../../../assets/images/nat-1-large.jpg")} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Photo 1"
              className="composition__photo composition__photo--p1"
              src={require("../../../assets/images/nat-1-large.jpg")}
            />

            <img
              srcSet={`${require("../../../assets/images/nat-2.jpg")} 300w, ${require("../../../assets/images/nat-2-large.jpg")} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Photo 3"
              className="composition__photo composition__photo--p2"
              src={require("../../../assets/images/nat-2-large.jpg")}
            />

            <img
              srcSet={`${require("../../../assets/images/nat-3.jpg")} 300w, ${require("../../../assets/images/nat-3-large.jpg")} 1000w`}
              sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
              alt="Photo 3"
              className="composition__photo composition__photo--p3"
              src={require("../../../assets/images/nat-3-large.jpg")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
