import React, { useState } from "react";
import "./operation.css";
import downloadBtn from "../../assets/Download.svg";
import jsPDF from "jspdf";
import Alert from '../Alert';
import 'jspdf-autotable'
const Downloadpdf = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const doc = new jsPDF();
    doc.autoTable({ html: '#content' ,showHead: 'everyPage'});
    doc.save(`${new Date().toLocaleDateString()}` + "-EXAM-STUDENTS.pdf")
    setTimeout(()=>{
      setIsDownloading(false);
    },2000)
  };

  return (
    <>
      {isDownloading ? (
        <>
          <div className="download-btn" onClick={handleDownloadPDF}>
            <img src={downloadBtn} alt="Download" />
          </div>
          <Alert alterText={'Preparing PDF'}/>
        </>
      ) : (
        <>
          <div className="download-btn" onClick={handleDownloadPDF}>
            <img src={downloadBtn} alt="Download" />
          </div>
        </>
      )}
    </>
  );
};

export default Downloadpdf;
