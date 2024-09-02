import React from "react";
import './operations/operation.css'
const Alert = ({alterText}) => {
  return (
    <>
    

    <div className="downloading">
    <div className="loader"></div>
    <p>{alterText}...</p>
    </div>
    </>
  );
};

export default Alert;
