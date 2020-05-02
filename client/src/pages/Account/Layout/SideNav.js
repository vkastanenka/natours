// React
import React from "react";

// Components
import Icon from "../../../components/Icon/Icon";

const SideNav = () => {
  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <li className="side-nav--active">
          <Icon type="settings" className='side-nav__icon' />Settings
        </li>
        <li>
          <Icon type="briefcase" className='side-nav__icon' />My bookings
        </li>
        <li>
          <Icon type="star" className='side-nav__icon' />My reviews
        </li>
        <li>
          <Icon type="credit-card" className='side-nav__icon' />Billing
        </li>
      </ul>
      <div className="admin-nav">
        <h5 className="admin-nav__heading">Admin</h5>
        <ul className="side-nav">
          <li>
            <Icon type="map" className='side-nav__icon' />Manage tours
          </li>
          <li>
            <Icon type="users" className='side-nav__icon' />Manage users
          </li>
          <li>
            <Icon type="star" className='side-nav__icon' />Manage reviews
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
