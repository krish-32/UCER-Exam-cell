const express = require('express');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this, 1);
const multer = require('multer');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const constructStudentDataFromPDF=require('./extractStudentData.cjs');
const app = express();
const PORT = process.env.PORT || 3000;
const dataArray=[];
// Set up multer for handling file uploads and specify the destination folder
const upload = multer({ dest: 'output_files' });


  // console.log(pdf);
app.post('/studentData', upload.array('pdfs'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  try {
    //this gives a buffer data of the input pdf file and it includes merge function to compain pdf
      const buffer_data=await merge_function(req.files);
    //this load the pdf buffer data to read the pdf file
      await pdfParser.loadPDF(path.join(__dirname,'output_files','modified.pdf'));
    //read the loaded pdf data  
      await pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      const pdf = await pdfData;
    //imported function to get the student details
      dataOfStudent=await constructStudentDataFromPDF(pdf);
      res.setHeader('Content-Type', 'application/pdf');
      console.log(dataOfStudent);
      res.json(JSON.stringify(dataOfStudent));
    });
  //throw an error while pdf data was fail to read
    pdfParser.on("pdfParser_dataError", (errData) =>
      console.error(errData.parserError)
    );
  } catch (error) {
    res.status(500).json({ 'message': 'Failed to merge PDFs.',error: error.message});
  };
});
//api port for student detail data
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/studentData`);
});

async function merge_function(files) {
  const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      // Load each uploaded PDF file
      const filePath = path.join(__dirname, file.path);
      const pdfBytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages from the current PDF into the merged PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    
    // Save the merged PDF as a buffer
    mergedPdfBytes = await mergedPdf.save();
    fs.writeFile('./output_files/modified.pdf', mergedPdfBytes, (err) => {
      if (err) throw err;
      console.log('Modified PDF saved.');
  });
  return mergedPdfBytes;
  // for json format
}
