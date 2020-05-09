// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Components
import Settings from "./ContentLayout/Settings";
import Bookings from "./ContentLayout/Bookings";
import Reviews from "./ContentLayout/Reviews";
import Billing from "./ContentLayout/Billing";

class Content extends Component {
  state = {
    content: <Settings />,
  };

  componentDidMount() {
    switch (this.props.match.params.page) {
      case "settings":
        this.setState({ content: <Settings /> });
        break;
      case "bookings":
        this.setState({ content: <Bookings /> });
        break;
      case "reviews":
        this.setState({ content: <Reviews /> });
        break;
      case "billing":
        this.setState({ content: <Billing /> });
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.match.params.page) {
      case "settings":
        this.setState({ content: <Settings /> });
        break;
      case "bookings":
        this.setState({ content: <Bookings /> });
        break;
      case "reviews":
        this.setState({ content: <Reviews /> });
        break;
      case "billing":
        this.setState({ content: <Billing /> });
        break;
    }
  }

  render() {
    return <div className="user-view__content">{this.state.content}</div>;
  }
}

export default withRouter(Content);
