import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Operations from "./components/operations/Operations";
import Results from "./components/results/Results";
import { dates } from "./helpers/examDates";
import { MyLocalStorage } from "./helpers/indexedDB.js";
const App = () => {
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
  const [date, setDate] = useState(() => {
    const month = new Date().toDateString().slice(4, 7).toLocaleUpperCase();
    const date = new Date().toDateString().slice(8, 10);
    const year = new Date().getFullYear().toString().slice(2, 4);
    const formatedDate = `${date}-${month}-${year}`;
    return formatedDate || "";
  });
  const studentLocalStorage = new MyLocalStorage();
  const examDateLocalStorage = new MyLocalStorage();
  const [studentStorage, setStudentstorage] = useState([]);
  const [examStorage, setExamStorage] = useState({});
  const [examDates, setExamDates] = useState(() => examStorage[date] || []);
  const [resultStudentData, setResultStudentData] = useState([
    {
      department: "Select Date",
      firstName: "Select ",
      lastName: "Date",
      registerNumber: "Select Date",
      id: "YYY",
      regulation: "Select Date",
    },
  ]);
  const [files, setFile] = useState([]);
  const [isUploading, setisUploading] = useState(false);
  const [Error, setError] = useState(null);
  // students indexed DB Local Storage
  // studentLocalStorage.setItem("studentData", studentData);
  // examDateLocalStorage.set("examDateData", dates);

  // for while loading the app searching the students if the student have exam
  useEffect(() => {
    // while loading the app getting the data from indexed db and store in state variable
    studentLocalStorage.get("studentData").then((data) => {
      setStudentstorage(data);
    });

    examDateLocalStorage.get("ExamDates").then((data) => {
      setExamStorage(data);
    });
  }, []);

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
      setExamDates(examStorage[__formatedDate]);
      // set [] if the undefined throw 
    } catch (err) {
      console.log(err.message);
    }
  };

  const searchExamStudents = () => {
    try {
      //filtering the exam students
      const __mappedStudentData = studentStorage.filter((data) => {
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
  // Handle form submission
  const handlePdfUpload = async (route) => {
    setisUploading(true);
    // Create a new FormData instance
    const formData = new FormData();
    // Append each file to FormData
    for (let i = 0; i < files.length; i++) {
      formData.append(route, files[i]);
    }
    try {
      // Make the POST request
      const response = await fetch(`http://localhost:3000/${route}`, {
        method: "POST",
        body: formData, // Send FormData with files
      });
      const resData = await response.json();
      studentLocalStorage.setItem(route, resData);
      setisUploading(false);
      console.log('Response Stored In IndexDB');
    } catch (error) {
      console.error("Error:", error);
      setError(error.message); 
    }
  };
  console.log(resultStudentData);
  console.log(examDates);
  console.log(date);
  console.log("student Data :" ,studentStorage);
  console.log("ExamDates Data :" ,examStorage);


  return (
    <>
      <Header />
      <Operations
        handleInputDate={handleInputDate}
        searchExamStudents={searchExamStudents}
        setFile={setFile}
        isUploading={isUploading}
        Error={Error}
        handlePdfUpload={handlePdfUpload}
      />
      <Results resultStudentData={resultStudentData} />
    </>
  );
};

export default App;
