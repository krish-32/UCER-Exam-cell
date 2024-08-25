import React from "react";
import Exampdf from "./examPdf/Exampdf";
import Studentpdf from "./studentpdf/Studentpdf";
import Search from "./data-search/Search";
import Deletedata from "./Deletedata";
import Downloadpdf from "./Downloadpdf";
import "./operation.css";

const Operations = ({
  handleInputDate,
  searchExamStudents,
  setFile,
  isUploading,
  Error,
  handlePdfUpload,
}) => {
  return (
    <section className="container main-menu">
      <div className="left-container">
        <Exampdf
          setFile={setFile}
          isUploading={isUploading}
          Error={Error}
          handlePdfUpload={handlePdfUpload}
        />
        <Studentpdf
          setFile={setFile}
          isUploading={isUploading}
          Error={Error}
          handlePdfUpload={handlePdfUpload}
        />
      </div>
      <div className="center-container">
        <Downloadpdf />
        <Deletedata />
      </div>
      <div className="right-container">
        <Search
          handleInputDate={handleInputDate}
          searchExamStudents={searchExamStudents}
        />
      </div>
    </section>
  );
};

export default Operations;
