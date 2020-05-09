// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Icon from "../../../components/Icon/Icon";

class SideNav extends Component {
  state = {
    currentPage: "settings",
  };

  componentDidMount() {
    switch (this.props.match.params.page) {
      case "settings":
        this.setState({ currentPage: "settings" });
        break;
      case "bookings":
        this.setState({ currentPage: "bookings" });
        break;
      case "reviews":
        this.setState({ currentPage: "reviews" });
        break;
      case "billing":
        this.setState({ currentPage: "billing" });
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.match.params.page) {
      case "settings":
        this.setState({ currentPage: "settings" });
        break;
      case "bookings":
        this.setState({ currentPage: "bookings" });
        break;
      case "reviews":
        this.setState({ currentPage: "reviews" });
        break;
      case "billing":
        this.setState({ currentPage: "billing" });
        break;
    }
  }

  render() {
    return (
      <nav className="user-view__menu">
        <ul className="side-nav">
          <Link to="/account/settings" className="link-style">
            <li
              className={
                this.state.currentPage === "settings" ? `side-nav--active` : ""
              }
            >
              <Icon type="settings" className="side-nav__icon" />
              Settings
            </li>
          </Link>
          <Link to="/account/bookings" className="link-style">
            <li
              className={
                this.state.currentPage === "bookings" ? `side-nav--active` : ""
              }
            >
              <Icon type="briefcase" className="side-nav__icon" />
              My bookings
            </li>
          </Link>
          <Link to="/account/reviews" className="link-style">
            <li
              className={
                this.state.currentPage === "reviews" ? `side-nav--active` : ""
              }
            >
              <Icon type="star" className="side-nav__icon" />
              My reviews
            </li>
          </Link>
          <Link to="/account/billing" className="link-style">
            <li
              className={
                this.state.currentPage === "billing" ? `side-nav--active` : ""
              }
            >
              <Icon type="credit-card" className="side-nav__icon" />
              Billing
            </li>
          </Link>
        </ul>
        {this.props.auth.user.role === "admin" ||
        this.props.auth.user.role === "lead-guide" ? (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <li>
                <Icon type="map" className="side-nav__icon" />
                Manage tours
              </li>
              <li>
                <Icon type="users" className="side-nav__icon" />
                Manage users
              </li>
              <li>
                <Icon type="star" className="side-nav__icon" />
                Manage reviews
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    );
  }
}

SideNav.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(SideNav));
