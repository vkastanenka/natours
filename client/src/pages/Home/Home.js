// React
import React from "react";

// Components
import Auxiliary from "../../components/HigherOrder/Auxiliary";

import Navigation from "./Layout/Navigation";
import Header from "./Layout/Header";
import About from "./Layout/About";
import Features from "./Layout/Features";
import Tours from "./Layout/Tours";
import Stories from "./Layout/Stories";
// import Book from "./Layout/Book";
import Popup from "./Layout/Popup";
import Footer from "../../components/Layout/Footer";

// Home page (route '/')
const Home = () => {
  return (
    <Auxiliary>
      <Navigation />
      <Header />
      <main>
        <About />
        <Features />
        <Tours />
        {/* <Stories /> */}
        {/* <Book /> */}
      </main>
      {/* <Footer /> */}
      {/* <Popup /> */}
    </Auxiliary>
  );
};

export default Home;
