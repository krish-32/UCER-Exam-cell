import React from "react";
import "./results.css";
import resultLogo from "../../assets/header.svg";

const Results = ({ resultStudentData }) => {
  return (
    <>
      <section className="container" id="resRef">
        <section className="results-container" id="pdf-content">
          <img
            src={resultLogo}
            alt="UCER LOGO"
            className="img-fluid  img-thumbnail"
            style={{ width: "100%", border: "none" }}
          />
          <table border="1">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                <th>Register Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Regulation</th>
              </tr>
            </thead>
            <tbody>
              {/* checking is students  have exam or not */}
              {resultStudentData.length ? (
                resultStudentData.map((resultData) => (
                  <tr key={resultData.id}>
                    <td>{resultData.registerNumber}</td>
                    <td>{resultData.firstName + "  " + resultData.lastName}</td>
                    <td>{resultData.department}</td>
                    <td>{resultData.regulation}</td>
                  </tr>
                ))
              ) : (
                <tr key="001">
                  <td>Students Not Found !</td>
                  <td>Students Not Found !</td>
                  <td>Students Not Found !</td>
                  <td>Students Not Found !</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
      <footer className="container">
        <p>
          Designed And Developed By Department Of Computer Science & Engineering
        </p>
      </footer>
    </>
  );
};

export default Results;
