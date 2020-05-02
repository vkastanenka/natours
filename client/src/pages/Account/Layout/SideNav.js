// React
import React from "react";

// Components
import Icon from "../../../components/Icon/Icon";

const SideNav = () => {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <Icon type="settings" />| Settings
        </li>
        <li>
          <Icon type="briefcase" />| My bookings
        </li>
        <li>
          <Icon type="star" />| My reviews
        </li>
        <li>
          <Icon type="credit-card" />| Billing
        </li>
      </ul>
      <div className="admin-nav">
        <h5 className="admin-nav__headin">Admin</h5>
        <ul className="side-nav">
          <li>
            <Icon type="map" />| Manage tours
          </li>
          <li>
            <Icon type="users" />| Manage users
          </li>
          <li>
            <Icon type="star" />| Manage reviews
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
