import React from "react";
import "./operation.css";
import deleteBtn from "../../assets/Trash.svg";

const Deletedata = () => {

  const deleteData = () =>{
    if(confirm('Are sure to Clear Data ?')){
       alert('Data Deleted !')
    }
  }
  return (
    <div className="delete-btn" onClick={deleteData}>
      <img src={deleteBtn} alt="Delete" />
    </div>
  );
};

export default Deletedata;
