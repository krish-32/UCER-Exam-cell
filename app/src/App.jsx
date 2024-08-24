import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Operations from "./components/operations/Operations";
import Results from "./components/results/Results";
import { dates } from "./helpers/examDates";

const App = () => {
  const [date, setDate] = useState(() => {
    const month = new Date().toDateString().slice(4, 7).toLocaleUpperCase();
    const date = new Date().toDateString().slice(8, 10);
    const year = new Date().getFullYear().toString().slice(2, 4);
    const formatedDate = `${date}-${month}-${year}`;
    return formatedDate;
  });
  const [examDates, setExamDates] = useState(() => dates[date] || []);
  const [resultStudentData, setResultStudentData] = useState([]);
  const studentData = [
    {
      id: "913019103002",
      registerNumber: "913019103002",
      firstName: "AJAY",
      lastName: "R",
      department: "Civil",
      regulation: "2017",
      subjects: ["CE8602", "CE8701", "PH3151", "CS3151"],
    },
    {
      id: "913019103006",
      registerNumber: "913019103006",
      firstName: "SAMBATH",
      lastName: "KUMAR",
      department: "Civil",
      regulation: "2017",
      subjects: ["CE8602", "CE8701", "CE8702", "CE8703", "PH3151"],
    },
    {
      id: "913019103007",
      registerNumber: "913019103007",
      firstName: "SANTHOSH",
      lastName: "B",
      department: "Civil",
      regulation: "2017",
      subjects: [
        "CE8005",
        "CE8602",
        "CE8603",
        "EN8592",
        "CE8701",
        "CE8702",
        "CE8703",
        "CE8021",
        "CS3151",
      ],
    },
  ];
  // for while loading the app searching the students if the student have exam
  useEffect(() => searchExamStudents(), []);

  const handleInputDate = () => {
    try {
      const __month = new Date(document.getElementById("date").value)
        .toDateString()
        .slice(4, 7)
        .toLocaleUpperCase();
      const __date = new Date(document.getElementById("date").value)
        .toDateString()
        .slice(8, 10);
      const __year = new Date(document.getElementById("date").value)
        .getFullYear()
        .toString()
        .slice(2, 4);
      //constructing the date for the object key. to get the exams
      const __formatedDate = `${__date}-${__month}-${__year}`;
      //setting the dates for the for the setDate
      setDate(__formatedDate);
      // creating a exam dates array with the formattedDate
      setExamDates(dates[__formatedDate]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const searchExamStudents = () => {
    try {
      //filtering the exam students
      const __mappedStudentData = studentData.filter((data) => {
        const __subjectsArr = data.subjects;
        for (let i = 0; i < __subjectsArr.length; i++) {
          //checking the student have exam on the date or not
          if (examDates.includes(__subjectsArr[i])) {
            return data;
          }
        }
      });
      // setting the examed students for results
      setResultStudentData(__mappedStudentData);
    } catch (err) {
      console.log(err.message);
      setResultStudentData([
        {
          department: "No Exam Today",
          firstName: "No Exam ",
          lastName: "Today",
          registerNumber: "No Exam Today",
          id: "YYY",
          regulation: "No Exam Today",
        },
      ]);
    }
  };

  console.log(resultStudentData);
  console.log(examDates);
  console.log(date);

  return (
    <>
      <Header />
      <Operations
        handleInputDate={handleInputDate}
        searchExamStudents={searchExamStudents}
      />
      <Results resultStudentData={resultStudentData} />
    </>
  );
};

export default App;
