// React
import React from "react";

// Components
import PageLayout from "../../components/Layout/PageLayout";

// Error page for undefined routes
const ErrorPage = () => {
  return (
    <PageLayout>
      <main className="main">
        <div className="error">
          <div className="error__title">
            <h2 className="heading-secondary heading-secondary--large heading-secondary--error">
              404 Not Found
            </h2>
            <h2 className="error__emoji">
              <span role="img" aria-label="Error header emojis">
                😢 🤯
              </span>
            </h2>
            <div className="error__msg">
              Sorry, the page you are looking for does not exist!
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default ErrorPage;
