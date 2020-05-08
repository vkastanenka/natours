// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Auxiliary from "../HigherOrder/Auxiliary";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Alert from "../Alert/Alert";

class PageLayout extends Component {
  state = {
    errors: {},
  };

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }
  }

  // Clear any timers if umounts
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    console.log(this.state.errors);

    let errors = [];

    if (this.state.errors) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    return (
      <Auxiliary>
        {Object.keys(this.state.errors).length > 0 ? (
          <Alert type="error" message={errors} />
        ) : null}
        <Navbar />
        {this.props.children}
        <Footer />
      </Auxiliary>
    );
  }
}

PageLayout.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { clearErrors })(PageLayout);
