import React from "react";
import "./search.css";
import searchBtn from "../../../assets/Search.svg";

const Search = () => {
  return (
    <div className="date-selection">
      <input
        type="date"
        name="date"
        id="date"
        style={{ backgroundColor: "#D9D9D9" }}
      />

      <span className="search">
        <img src={searchBtn} alt="search" />
      </span>
    </div>
  );
};

export default Search;
