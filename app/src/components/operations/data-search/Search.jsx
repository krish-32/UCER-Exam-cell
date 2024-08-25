import React from "react";
import "./search.css";
import searchBtn from "../../../assets/Search.svg";
const Search = ({ handleInputDate, searchExamStudents }) => {
  return (
    <div className="date-selection">
      <input
        type="date"
        name="date"
        id="date"
        style={{ backgroundColor: "#D9D9D9" }}
        onChange={() => handleInputDate()}
      />

      <span className="search" onClick={() => searchExamStudents()}>
        <a href="#resRef">
          <img src={searchBtn} alt="search" />
        </a>
      </span>
    </div>
  );
};

export default Search;
