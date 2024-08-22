import React from "react";
import "./operation.css";
import deleteBtn from "../../assets/Trash.svg";

const Deletedata = () => {
  return (
    <div className="delete-btn">
      <img src={deleteBtn} alt="Delete" />
    </div>
  );
};

export default Deletedata;
