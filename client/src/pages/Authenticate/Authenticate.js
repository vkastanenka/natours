// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import Login from "../../components/Forms/Login";
import Register from "../../components/Forms/Register";

class Authenticate extends Component {
  state = {
    isRegistered: true,
  };

  // If the user is authenticated, just push them to tours page
  componentDidMount() {
    if (this.props.auth.authenticated) this.props.history.push("/tours");

    // Change page to login/register depending on URL params
    if (this.props.match.params.type === "login") {
      this.setState({ isRegistered: true });
    } else if (this.props.match.params.type === 'register') {
      this.setState({ isRegistered: false });
    }
  }

  // If the user logs in, push them to the tours page
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) this.props.history.push("/tours");

    // Change page to login/register depending on URL params
    if (nextProps.match.params.type === "login") {
      this.setState({ isRegistered: true });
    } else if (nextProps.match.params.type === "register") {
      this.setState({ isRegistered: false });
    }
  }

  render() {
    let formContent = <Login />;
    if (!this.state.isRegistered)
      formContent = (
        <Register />
      );

    return (
      <PageLayout>
        <main className="main">
          <div className="authenticate-form">{formContent}</div>
        </main>
      </PageLayout>
    );
  }
}

Authenticate.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Authenticate);
