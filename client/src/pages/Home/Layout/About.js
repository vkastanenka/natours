// React
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

// Components
import Popup from "./Popup";
import Auxiliary from "../../../components/HigherOrder/Auxiliary";

// About section for home page
class About extends Component {
  state = { popup: false };

  render() {
    return (
      <Auxiliary>
        <CSSTransition
          in={this.state.popup}
          timeout={300}
          classNames="popup--transition"
          unmountOnExit
        >
          <Popup popupClose={() => this.setState({ popup: false })} />
        </CSSTransition>
        <section className="section-about">
          <div>
            <h2 className="heading-secondary heading-secondary--large">
              Exciting tours for adventurous people
            </h2>
          </div>
          <div className="row">
            <div className="col-1-of-2">
              <h3 className="heading-tertiary ma-bt-sm">
                You're going to fall in love with nature
              </h3>
              <p className="paragraph ma-bt-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aperiam, ipsum sapiente aspernatur libero repellat quis
                consequatur ducimus quam nisi exercitationem omnis earum qui.
              </p>

              <h3 className="heading-tertiary ma-bt-sm">
                Live adventures like you never have before
              </h3>
              <p className="paragraph ma-bt-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores nulla deserunt voluptatum nam.
              </p>

              <button
                className="btn-text"
                onClick={() => this.setState({ popup: true })}
              >
                Learn more &rarr;
              </button>
            </div>

            <div className="col-1-of-2">
              <div className="composition">
                {/* eslint-disable-next-line */}
                <img
                  srcSet={`${require("../../../assets/images/nat-1.jpg")} 300w, ${require("../../../assets/images/nat-1-large.jpg")} 1000w`}
                  sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                  alt="Photo 1"
                  className="composition__photo composition__photo--p1"
                  src={require("../../../assets/images/nat-1-large.jpg")}
                />

                {/* eslint-disable-next-line */}
                <img
                  srcSet={`${require("../../../assets/images/nat-2.jpg")} 300w, ${require("../../../assets/images/nat-2-large.jpg")} 1000w`}
                  sizes="(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px"
                  alt="Photo 3"
                  className="composition__photo composition__photo--p2"
                  src={require("../../../assets/images/nat-2-large.jpg")}
                />

                {/* eslint-disable-next-line */}
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
      </Auxiliary>
    );
  }
}

export default About;
