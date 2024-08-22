import React from "react";
import "./operation.css";
import downloadBtn from "../../assets/Download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Downloadpdf = () => {
    const handleDownloadPDF = () => {
      // getting the react component
      const input = document.getElementById('pdf-content');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;
      
      // converting the react component to canvas to pdf
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.7); 
        // Use JPEG and set quality to 0.7
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // logic for adding pdf pages
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('download.pdf');
      });
  };                                                                                
  

  
  
  return (
    <>
      <div className="download-btn" onClick={handleDownloadPDF}>
        <img src={downloadBtn} alt="Download" />
      </div>
    </>
  );
};

export default Downloadpdf;
