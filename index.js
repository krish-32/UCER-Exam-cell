const fs = require('fs');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this, 1);
let studentData = [];
let i, j;

pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
);

// for json format
pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    const pdf = await pdfData;
    // console.log(pdf);
    await constructStudentDataFromPDF(pdf);
});

pdfParser.loadPDF("CE 08.pdf");


async function constructStudentDataFromPDF(pdf) {
    for (j = 0; j <= pdf.Pages.length - 1; j++) {
        let registerNumber;
        let firstName;
        let lastName;
        let regulation;
        let subjects = [];
        let numberOfSubjects;
        let department;
        let index;
        for (i = 0; i <= pdf.Pages[j].Texts.length - 1; i++) {
            // this code for checking the text objects
            if (pdf.Pages[j].Texts[i].R[0].T == "Number") {
                // getting the student register number
                registerNumber = pdf.Pages[j].Texts[i + 1].R[0].T
                console.log(registerNumber);
            } else if (pdf.Pages[j].Texts[i].R[0].T == "Subjects") {
                numberOfSubjects = Number(pdf.Pages[j].Texts[i + 1].R[0].T)
                console.log(numberOfSubjects);
            } else if (pdf.Pages[j].Texts[i].R[0].T == "the") {
                // this code is for getting the student name 
                if (pdf.Pages[j].Texts[i + 1].R[0].T == "Candidate") {
                    firstName = pdf.Pages[j].Texts[i + 2].R[0].T;
                    lastName = pdf.Pages[j].Texts[i + 3].R[0].T;
                    console.log(firstName);
                    console.log(lastName);
                }

            } else if (pdf.Pages[j].Texts[i].R[0].T == "Regulations") {
                // this is for regulations.
                regulation = pdf.Pages[j].Texts[i + 1].R[0].T;
                console.log(regulation);
            } else if (pdf.Pages[j].Texts[i].R[0].T == "B.E.") {
                // this is for department
                department = pdf.Pages[j].Texts[i + 1].R[0].T;
                console.log(department);
            } else if (pdf.Pages[j].Texts[i].R[0].T.lastIndexOf("Title") !== -1) {
                // this is for index
                index = i + 1;
            }
        }
        // TODO loop for get  the subjects of the students
        for (let k = 0; k <= numberOfSubjects - 1; k++) {
            // storing the student subjects in array
            subjects.push(pdf.Pages[j].Texts[index + numberOfSubjects + k].R[0].T)
            // console.log(pdf.Pages[j].Texts[index + numberOfSubjects + k].R[0].T);
        }
        // TODO constructing the students data.
        const individualStudentData = {
            id: registerNumber,
            registerNumber: registerNumber,
            firstName: firstName,
            lastName: lastName,
            department: department,
            regulation: regulation,
            subjects: subjects,
        }

        // TODO  console.log(individualStudentData);
        // pushing the constructed student data into studentData
        studentData.push(individualStudentData);
        // console.log(pdf.Pages[j].Texts[index + numberOfSubjects].R[0].T);
    }
    console.log(studentData);
    fs.writeFile(
        "studentData.json",
        JSON.stringify(studentData),
        (data) => console.log('Write Success')
    );
}

