import PDFMerger from 'pdf-merger-js';
const merger = new PDFMerger();

async function mergePDF() {

    await merger.add('./CE4.pdf');  //merge all pages. parameter is the path to file and filename.
    await merger.add('./CE AR.pdf');


    // Set metadata
    await merger.setMetadata({
        producer: "WebMa Dev Team",
        author: "WebMa",
        creator: "WebMa",
        title: "Merged PDF"
    });

    await merger
    .save('merged.pdf')
    .then(console.log('PDF Merged')); //save under given name and reset the internal document

    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);

}

mergePDF()