// React
import React, { Component } from "react";

// Components
import UpdateAccount from "../../../components/Forms/UpdateAccount";
import UpdatePassword from "../../../components/Forms/UpdatePassword";

class Content extends Component {
  render() {
    return (
      <div className="user-view__content">
        <div className="user-view__form-container">
          <UpdateAccount />
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
          <UpdatePassword />
        </div>
      </div>
    );
  }
}

export default Content;
