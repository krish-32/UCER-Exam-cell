import React from "react";
import "./operation.css";
import downloadBtn from "../../assets/Download.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Downloadpdf = () => {
  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const inputHeight = input.scrollHeight;
    const inputWidth = input.scrollWidth;
    const scale = pageWidth / inputWidth;

    let position = 1;

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
      pdf.save(`${new Date().toLocaleDateString()}` + "-EXAM-STUDENTS.pdf");
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
