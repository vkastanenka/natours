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
    if (this.props.location.pathname === "/authenticate/register") {
      this.setState({ isRegistered: false });
    }
  }

  // If the user logs in, push them to the tours page
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) this.props.history.push("/tours");
    if (nextProps.location.pathname === "/authenticate/register") {
      this.setState({ isRegistered: false });
    } else if (nextProps.location.pathname === "/authenticate/login") {
      this.setState({ isRegistered: true });
    }
  }

  render() {
    let formContent = <Login />;
    if (!this.state.isRegistered)
      formContent = (
        <Register onClick={() => this.setState({ isRegistered: true })} />
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
