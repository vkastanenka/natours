// React
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import Account from './pages/Account/Account';
import ToursOverview from './pages/ToursOverview/ToursOverview';
import Tour from './pages/Tour/Tour';
import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Styling
import "./assets/css/style.css";

class App extends Component {
  render() {
    return (
      <div data-alert={`${alert ? alert : ""}`}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/authenticate" component={Authenticate} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/tours" component={ToursOverview} />
            <Route exact path="/tour" component={Tour} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
