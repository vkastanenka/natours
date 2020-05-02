// React
import React from "react";

// Components
import Auxiliary from "./Auxiliary";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const PageAux = (props) => {
  return (
    <Auxiliary>
      <Navbar />
      {props.children}
      <Footer />
    </Auxiliary>
  );
};

export default PageAux;
