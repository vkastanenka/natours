// React
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Components
import PageLayout from "../../components/Layout/PageLayout";
import SideNav from "./Layout/SideNav";
import Content from "./Layout/Content";

// Account page to edit information
const Account = (props) => {
  if (!props.auth.authenticated) {
    props.history.push("/authenticate/login");
  }

  return (
    <PageLayout>
      <main className="main">
        <div className="user-view">
          <SideNav />
          <Content />
        </div>
      </main>
    </PageLayout>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Account);
