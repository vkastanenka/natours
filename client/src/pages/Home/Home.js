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
import Contact from "./Layout/Contact";
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
        <Stories />
        <Contact />
      </main>
      <Footer />
    </Auxiliary>
  );
};

export default Home;
