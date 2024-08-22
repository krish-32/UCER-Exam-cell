import React from "react";
import Exampdf from "./examPdf/Exampdf";
import Studentpdf from "./studentpdf/Studentpdf";
import Search from "./data-search/Search";
import Deletedata from "./Deletedata";
import Downloadpdf from "./Downloadpdf";
import "./operation.css";

const Operations = () => {
  return (
    <section className="container">
      <div className="left-container">
        <Exampdf />
        <Studentpdf />
      </div>
      <div className="center-container">
        <Downloadpdf />
        <Deletedata />
      </div>
      <div className="right-container">
        <Search />
      </div>
    </section>
  );
};

export default Operations;
