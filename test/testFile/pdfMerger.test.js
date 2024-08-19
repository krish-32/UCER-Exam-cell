import PDFMerger from 'pdf-merger-js';
const merger = new PDFMerger();

async function mergePDF() {

    await merger.add('PDF_LOCATION');  //merge all pages. parameter is the path to file and filename.
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');
    await merger.add('PDF_LOCATION');


    // Set metadata
    await merger.setMetadata({
        producer: "WebMa Dev Team",
        author: "WebMa",
        creator: "WebMa",
        title: "Merged PDF"
    });

    await merger.save('merged.pdf'); //save under given name and reset the internal document

    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);

}

mergePDF()