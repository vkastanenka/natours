// React
import React from "react";

// Components
import Auxiliary from "../HigherOrder/Auxiliary";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Layour for page with navbar and footer
const PageLayout = (props) => {
  return (
    <Auxiliary>
      <Navbar />
      {props.children}
      <Footer />
    </Auxiliary>
  );
};

export default PageLayout;
