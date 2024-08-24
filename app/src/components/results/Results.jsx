import React from "react";
import "./results.css";
import resultLogo from "../../assets/header.svg";

const Results = ({ resultStudentData }) => {
  return (
    <>
      <section className="container">
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
              {resultStudentData.map((resultData) => (
                <tr key={resultData.id}>
                  <td>{resultData.registerNumber}</td>
                  <td>{resultData.firstName + "  "+resultData.lastName}</td>
                  <td>{resultData.department}</td>
                  <td>{resultData.regulation}</td>
                </tr>
              ))}
              {/* <tr>
              <td>67890</td>
              <td>Jane Smith </td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>67890</td>
              <td>Jane Smith</td>
              <td>Electrical Engineering</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>11223</td>
              <td>Emily Johnson</td>
              <td>Mechanical Engineering</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>John Doe</td>
              <td>Computer Science</td>
              <td>2021</td>
            </tr>
            <tr>
              <td>Last</td>
              <td>Last</td>
              <td>Last</td>
              <td>2020</td>
            </tr> */}
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
