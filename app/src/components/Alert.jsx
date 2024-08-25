import React from "react";
import './operations/operation.css'
const Alert = ({alterText}) => {
  return (
    <div className="downloading">
      <p>{alterText}...</p>
    </div>
  );
};

export default Alert;
