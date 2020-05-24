// React
import React from "react";

// Components
import Auxiliary from "../../../../components/HigherOrder/Auxiliary";
import UpdateAccount from "../../../../components/Forms/UpdateAccount";
import UpdatePassword from "../../../../components/Forms/UpdatePassword";

// Settings page for user's account and password
const Settings = () => {
  return (
    <Auxiliary>
      <div className="user-view__form-container">
        <UpdateAccount />
      </div>
      <div className="line">&nbsp;</div>
      <div className="user-view__form-container">
        <UpdatePassword />
      </div>
    </Auxiliary>
  );
};

export default Settings;
