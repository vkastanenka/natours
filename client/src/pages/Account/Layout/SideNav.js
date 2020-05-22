// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import Icon from "../../../components/Icon/Icon";
import Auxiliary from "../../../components/HigherOrder/Auxiliary";

// Side nav for account page with links to different page settings
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
      case "manageTours":
        this.setState({ currentPage: "manageTours" });
        break;
      case "manageUsers":
        this.setState({ currentPage: "manageUsers" });
        break;
      case "manageReviews":
        this.setState({ currentPage: "manageReviews" });
        break;
      default:
        this.setState({ currentPage: "settings" });
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
      case "manageTours":
        this.setState({ currentPage: "manageTours" });
        break;
      case "manageUsers":
        this.setState({ currentPage: "manageUsers" });
        break;
      case "manageReviews":
        this.setState({ currentPage: "manageReviews" });
        break;
      default:
        this.setState({ currentPage: "settings" });
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
          {this.props.auth.user.role === "user" ? (
            <Auxiliary>
              <Link to="/account/bookings" className="link-style">
                <li
                  className={
                    this.state.currentPage === "bookings"
                      ? `side-nav--active`
                      : ""
                  }
                >
                  <Icon type="briefcase" className="side-nav__icon" />
                  My bookings
                </li>
              </Link>
              <Link to="/account/reviews" className="link-style">
                <li
                  className={
                    this.state.currentPage === "reviews"
                      ? `side-nav--active`
                      : ""
                  }
                >
                  <Icon type="star" className="side-nav__icon" />
                  My reviews
                </li>
              </Link>
            </Auxiliary>
          ) : null}
        </ul>
        {this.props.auth.user.role === "admin" ||
        this.props.auth.user.role === "lead-guide" ? (
          <div className="admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <Link to="/account/manageTours" className="link-style">
                <li>
                  <Icon type="map" className="side-nav__icon" />
                  Manage tours
                </li>
              </Link>
              <Link to="/account/manageUsers" className="link-style">
                <li>
                  <Icon type="users" className="side-nav__icon" />
                  Manage users
                </li>
              </Link>
              <Link to="/account/manageReviews" className="link-style">
                <li>
                  <Icon type="star" className="side-nav__icon" />
                  Manage reviews
                </li>
              </Link>
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
  tours: state.tours,
});

export default connect(mapStateToProps)(withRouter(SideNav));
