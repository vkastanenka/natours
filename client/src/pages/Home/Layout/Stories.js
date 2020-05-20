// React
import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

// Components
import Popup from "./Popup";
import Story from "../../../components/Story/Story";
import Auxiliary from "../../../components/HigherOrder/Auxiliary";

// Stories section of the home page
class Stories extends Component {
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
        <section className="section-stories">
          <div className="bg-video">
            <video className="bg-video__content" autoPlay muted loop>
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

          <div className="ta-center ma-bt-lg">
            <h2 className="heading-secondary heading-secondary--large">
              We make people genuinely happy
            </h2>
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
              title="I've never felt so at peace with myself"
              story="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
          ipsum sapiente aspernatur libero repellat quis consequatur ducimus
          quam nisi exercitationem omnis earum qui. Aperiam, ipsum sapiente
          aspernatur libero repellat quis consequatur ducimus quam nisi
          exercitationem omnis earum qui."
            />
          </div>

          <div>
            <button
              className="btn-text"
              onClick={() => this.setState({ popup: true })}
            >
              Read all stories &rarr;
            </button>
          </div>
        </section>
      </Auxiliary>
    );
  }
}

export default Stories;
