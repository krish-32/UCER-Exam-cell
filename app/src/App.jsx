import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Operations from "./components/operations/Operations";
import Results from "./components/results/Results";
import { MyLocalStorage } from "./db/indexedDB.js";
import Alert from "./components/Alert.jsx";

const App = () => {
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
  const [Error, setError] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  // for while loading the app searching the students if the student have exam
  useEffect(() => {
    // while loading the app getting the data from indexed db and store in state variable
    setIsLoading(true)
    studentLocalStorage.get("studentData").then((data) => {
      setStudentstorage(data);
    });

    examDateLocalStorage.get("ExamDates").then((data) => {
      setExamStorage(data);
    });
    setTimeout(()=> setIsLoading(false) ,2500);
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
  const handlePdfUpload = (route) => {
    // delaying hte response time from the server
    setTimeout(async () => {
      // Create a new FormData instance
      const formData = new FormData();
      // Append each file to FormData
      for (let i = 0; i < files.length; i++) {
        formData.append(route, files[i]);
      }
      try {
        if (files.length == 0) {
          alert("No Files Were Selected !");
          setisUploading(false);
        } else {
          // for display message
          setisUploading(true);
          // Make the POST request
          const response = await fetch(
            `https://ucer-backend-50021988656.development.catalystappsail.in/${route}`,
            {
              method: "POST",
              body: formData, // Send FormData with files
            }
          );
          const resData = await response.json();
          console.log(response.status);
          // checking if any error from server
          studentLocalStorage.setItem(route, resData);
          // getting the data from the indexedDB
          studentLocalStorage.get("studentData").then((data) => {
            setStudentstorage(data);
          });
          examDateLocalStorage.get("ExamDates").then((data) => {
            setExamStorage(data);
          });
          setisUploading(false);
          setFile([])
          console.log("Response Stored In IndexDB");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(true);
      }
      // if there is no error in server
      setError(false);
    }, 2000);
  };


  // logs for the reference
  console.log(resultStudentData);
  console.log(examDates);
  console.log(date);
  console.log("student Data :", studentStorage);
  console.log("ExamDates Data :", examStorage);

  return (
    <>
      <Header />
      {isLoading ? <Alert alterText={'Loading Please Wait'} /> : <></>}
      <Operations
        handleInputDate={handleInputDate}
        searchExamStudents={searchExamStudents}
        setFile={setFile}
        isUploading={isUploading}
        Error={Error}
        handlePdfUpload={handlePdfUpload}
        studentStorage={studentStorage}
        examStorage={examStorage}
        setStudentstorage={setStudentstorage}
        setExamStorage={setExamStorage}
      />
      <Results resultStudentData={resultStudentData} />
    </>
  );
};

export default App;
