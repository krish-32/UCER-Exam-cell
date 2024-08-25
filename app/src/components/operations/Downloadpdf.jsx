import React, { useState } from "react";
import "./operation.css";
import downloadBtn from "../../assets/Download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Alert from '../Alert';

const Downloadpdf = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownloadPDF = () => {
    setIsDownloading(true);
    const input = document.getElementById("pdf-content");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const inputHeight = input.scrollHeight;

    let position = 0;

    const capturePage = (scrollPosition) => {
      input.scrollTop = scrollPosition;
      return html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.7);
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
        position += imgHeight;

        // Add a new page if the content exceeds the current page height
        if (position >= pageHeight) {
          pdf.addPage();
          position = 1;
        }
      });
    };

    const promises = [];
    for (let i = 0; i < inputHeight; i += pageHeight) {
      promises.push(capturePage(i));
    }

    Promise.all(promises).then(() => {
      setIsDownloading(false);
      pdf.save(`${new Date().toLocaleDateString()}` + "-EXAM-STUDENTS.pdf");
    });
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
