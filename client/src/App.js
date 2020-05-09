// React
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Redux
import store from "./store/store";
import { Provider } from "react-redux";

// Actions
import { setCurrentUser, logout } from "./store/actions/authActions";

// Utilities
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Components
import ScrollToTop from "./components/HigherOrder/ScrollToTop";
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import Account from "./pages/Account/Account";
import ToursOverview from "./pages/ToursOverview/ToursOverview";
import Tour from "./pages/Tour/Tour";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Styling
import "./assets/css/style.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logout());
    // Redirect to landing
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/authenticate/:type" component={Authenticate} />
              <Route exact path="/account/:page" component={Account} />
              <Route exact path="/tours" component={ToursOverview} />
              <Route exact path="/tour/:slug" component={Tour} />
              <Route path="/*" component={ErrorPage} />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
