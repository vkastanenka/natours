// React
import React from "react";
// import PropTypes from "prop-types";

// Components
import PageLayout from "../../components/Layout/PageLayout";

const ErrorPage = (props) => {
  return (
    <PageLayout>
      <main className="main">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--large heading-secondary--error">
              {/* {props.heading} */}
              404 Not Found
            </h2>
            <h2 className="error__emoji">
              <span role="img" aria-label="Error header emojis">
                😢 🤯
              </span>
            </h2>
            {/* <div className="error__msg">{props.message}</div> */}
            <div className="error__msg">
              Sorry, the page you are looking for does not exist!
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

// ErrorPage.propTypes = {
//   heading: PropTypes.string.isRequired,
//   message: PropTypes.string.isRequired,
// };

export default ErrorPage;
