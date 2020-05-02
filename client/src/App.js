// React
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Components
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import UndefinedPage from "./pages/ErrorPage/ErrorPage";
import Footer from "./components/Layout/Footer";

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
            <Route path="/*" component={UndefinedPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
