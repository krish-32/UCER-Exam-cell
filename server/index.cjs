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
const constructExamDatesFromPDF=require('./extractExamDates.cjs')
// Set up multer for handling file uploads and specify the destination folder
const upload = multer({ dest: 'output_files' });






  // console.log(pdf);
app.post('/studentData', upload.array('pdfs'), async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (!req.files || req.files.length === 0) {
    res.status(400).json({ message: 'No files were uploaded.' });
  }

  try {
    //this gives a buffer data of the input pdf file and it includes merge function to compain pdf
    await merge_function(path.join(__dirname,'output_files','merged_pdf.pdf'),req.files);  
    //this load the pdf buffer data to read the merged pdf file
    await pdfParser.loadPDF(path.join(__dirname, 'output_files', 'merged_pdf.pdf'));
    //this read the merged pdf data and get the student data as per the imported function
    await pdfParser.on('pdfParser_dataReady', async (pdfData) => {
      // Process the PDF data to extract student details
      const dataOfStudent = await constructStudentDataFromPDF(pdfData);
      
      return res.status(200).send(JSON.stringify({ message: dataOfStudent }));
    });
    pdfParser.on('pdfParser_dataError', (errData) => {
      console.log("error on pdf read");
    });
      
  }catch (error) {
    res.status(500).json({ message: 'Failed to merge PDFs.',error: error.message});
  };
});








app.post('/ExamDates',upload.array('file'),async(req,res)=>{
  res.setHeader('Content-Type', 'application/json');
  if(!req.files){
    res.json({'error':'No files were uploaded'});
  }
  else{
  try{
    await merge_function(path.join(__dirname,'output_files','dates_pdf.pdf'),req.files)
    //this load the pdf buffer data to read the merged pdf file
    await pdfParser.loadPDF(path.join(__dirname, 'output_files', 'dates_pdf.pdf'));
    //this read the merged pdf data and get the student data as per the imported function
    await pdfParser.on('pdfParser_dataReady', async (pdfData) => {
      // Process the PDF data to extract student details
      const datesOfExam = await constructExamDatesFromPDF(pdfData);

      return res.status(200).send(JSON.stringify({ message: datesOfExam }));
    });
    pdfParser.on('pdfParser_dataError', (errData) => {
      console.log("error on pdf read");
    });
      
  }catch (error) {
    res.status(500).json({ message: 'Failed at respose json data.',error: error.message});
  };
}
});





//api port for student detail data
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/studentData/`);
});





async function merge_function(pathOfpdfFiles,files) {
  const mergedPdf = await PDFDocument.create();

    for (let file of files) {
      // Load each uploaded PDF file
      const filePath = path.join(__dirname, file.path);
      const pdfBytes = fs.readFileSync(filePath);
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages from the current PDF into the merged PDF
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
      fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}. ${err}`);
        }
    });
    }
    
    // Save the merged PDF as a buffer
    mergedPdfBytes = await mergedPdf.save();
    fs.writeFile(pathOfpdfFiles, mergedPdfBytes, (err) => {
      if (err) throw err;
      console.log('Modified PDF saved.');
  });
  
  return mergedPdfBytes;
  // for json format
}