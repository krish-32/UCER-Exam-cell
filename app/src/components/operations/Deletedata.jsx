import React from "react";
import "./operation.css";
import deleteBtn from "../../assets/Trash.svg";
import { MyLocalStorage } from "../../db/indexedDB";
const Deletedata = ({ setStudentstorage,setExamStorage}) => {

  const deleteIndexedDB = new MyLocalStorage();
  
  const deleteData = () =>{
    if(confirm('Are sure to Clear Data ?')){
       deleteIndexedDB.clear().then(()=>{
        setStudentstorage([]);
        setExamStorage({});
         alert('All Data Deleted !!');
       })
    }
  }
  return (
    <div className="delete-btn" onClick={deleteData}>
      <img src={deleteBtn} alt="Delete" />
    </div>
  );
};

export default Deletedata;
