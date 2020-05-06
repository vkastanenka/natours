// React
import React, { Component } from "react";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import Login from "../../components/Forms/Login";
import Register from "../../components/Forms/Register";

class Authenticate extends Component {
  state = {
    isRegistered: false,
  };

  render() {
    let formContent = <Login />;
    if (!this.state.isRegistered)
      formContent = (
        <Register onClick={() => this.setState({ isRegistered: true })} />
      );

    return (
      <PageLayout
        isRegistered={() => this.setState({ isRegistered: true })}
        isNotRegistered={() => this.setState({ isRegistered: false })}
      >
        <main className="main">
          <div className="authenticate-form">{formContent}</div>
        </main>
      </PageLayout>
    );
  }
}

export default Authenticate;
