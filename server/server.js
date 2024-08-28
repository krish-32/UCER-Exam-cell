const express = require('express');
const PDFParser = require('pdf2json');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const constructStudentDataFromPDF = require('./utils/extractStudentData.cjs');
const app = express();
const constructExamDatesFromPDF = require('./utils/extractExamDates.cjs');
// Set up multer for handling file uploads || stores data in the Buffer.
const bufferStorage = multer.memoryStorage();
const upload = multer({storage: bufferStorage });

//this is used to allows the given orgin to fetch data
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
};

// Apply the CORS middleware with the options
app.use(cors());

// home route for testing
app.get('/' ,(req,res) => {
  res.status(200).json({Message : "You Hit A Home URL !"})
});

app.post('/studentData', upload.array('studentData'), async (req, res) => {
  if (!req.files||req.files.length===0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  } else {
    try {
      const pdfParser = new PDFParser(this, 1);
      //this gives a buffer data of the input pdf file and it includes merge function to compain pdf
      const Student_buffer_data=await merge_function(req.files);
      //this load the pdf buffer data to read the merged pdf file
      await  pdfParser.parseBuffer(Student_buffer_data);
      //this read the merged pdf data and get the student data as per the imported function
      await pdfParser.once('pdfParser_dataReady', async (pdfData) => {
        // Process the PDF data to extract student details
        const dataOfStudent = await constructStudentDataFromPDF(pdfData);
        // removing the pdfParser_dataReady event
        pdfParser.removeAllListeners();
        return res.status(200).json(dataOfStudent);
      });
       await pdfParser.once('pdfParser_dataError', (errData) => {
        //console.log(errData);
        // removing the pdfParser_dataError event
        pdfParser.removeAllListeners();
        return res.status(500).json(errData);
      });
      console.log("Respose Sent /StudentData");
    } catch (error) {
      return res.status(500).json({ message: 'Failed to merge PDFs.', error: error.message });
    };
  }
});


app.post('/ExamDates', upload.array('ExamDates'), async (req, res) => {
  if (!req.files||req.files.length===0) {
    return res.status(400).json({ message: 'No files were uploaded' });
  }
  else {
    try {
      const pdfParser = new PDFParser(this, 1);
      const Dates_buffer_data=await merge_function(req.files)
      //this load the pdf buffer data to read the merged pdf file
      await pdfParser.parseBuffer(Dates_buffer_data);
      //this read the merged pdf data and get the student data as per the imported function
      await pdfParser.once('pdfParser_dataReady', async (pdfData) => {
        // Process the PDF data to extract student details
        const datesOfExam = await constructExamDatesFromPDF(pdfData);
        // removing the pdfParser_dataReady event
        pdfParser.removeAllListeners();
        //console.log(datesOfExam);
        return res.status(200).json(datesOfExam);
      });
      await pdfParser.once('pdfParser_dataError',  (errData) => {
        console.log(errData);
        // removing the pdfParser_dataError event
        pdfParser.removeAllListeners();
        return res.status(500).json(errData);

      });
      console.log("Respose Sent /ExamDates");
    } catch (error) {
      return res.status(500).json({ message: 'Failed at respose json data.', error: error.message });
    };
  }
});



//api port for student detail data
app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT || 9000, () => {
  console.log(`Server is running on port http://localhost:${process.env.X_ZOHO_CATALYST_LISTEN_PORT}`);
});





async function merge_function(files) {
  const mergedPdf = await PDFDocument.create();

  for (let file of files) {
    // Load each uploaded PDF file
    const pdf = await PDFDocument.load(file.buffer);
    // Copy all pages from the current PDF into the merged PDF
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  // Save the merged PDF as a buffer
  mergedPdfBytes = await mergedPdf.save();
  return mergedPdfBytes;
  // for json format
}

