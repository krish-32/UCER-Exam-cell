const fs = require('fs');
const PDFParser = require('pdf2json');
const pdfParser = new PDFParser(this, 1);
const path = require('path');
let time_table = [];
let dict_data={};
let i, j;

pdfParser.on("pdfParser_dataError", (errData) =>
    console.error(errData.parserError)
);

// for json format
pdfParser.on("pdfParser_dataReady", async (pdfData) => {
    const pdf = await pdfData;
    // console.log(pdf);
    await constructExamDatesFromPDF(pdf);
});

pdfParser.loadPDF('date.pdf');
async function constructExamDatesFromPDF(pdf) {
    for (j = 0; j <pdf.Pages.length; j++) {
        // let dict_data={};
        let department;
        let count=0;
        for (i = 0; i <= pdf.Pages[j].Texts.length - 1; i++) {
            if(pdf.Pages[j].Texts[i].R[0].T==="Branch%20Name"){
                department= pdf.Pages[j].Texts[i+1].R[0].T
                i=i+2;
                while(pdf.Pages[j].Texts[i].R[0].T!="Semes"){
                    count=count+1;
                    i=i+1;
                } 
                i=i+4;
            }
            
            if(pdf.Pages[j].Texts[i].R[0].T==="Code"){
                let init=i+count+1;
                let total=i+count+count;
                let date=i+count+count+1;
                
                for(let sub=init;sub<=total;sub++){
                    let arr=[];
                    if(date<i+count+count+count){
                        let date_data=pdf.Pages[j].Texts[date].R[0].T;
                        date=date+1;
                        let k=0;
                        if(dict_data[date_data]){
                            dict_data[date_data]=dict_data[date_data]+","+pdf.Pages[j].Texts[sub+k].R[0].T
                            arr=dict_data[date_data].split(",")
                        }else{
                            while(date_data==pdf.Pages[j].Texts[date].R[0].T){
                       
                                arr.push(pdf.Pages[j].Texts[sub+k].R[0].T)
                                date_data=pdf.Pages[j].Texts[date].R[0].T
                                date=date+1;
                                sub=sub+1;
                            }
                            arr.push(pdf.Pages[j].Texts[sub].R[0].T)
                            
                        }
                        dict_data[date_data]=arr
                    }
                }
            }
            
        }
        const TimeTable={
            department:department,
            date:dict_data
        }
<<<<<<< HEAD:test.js
        time_table.push(TimeTable);
        console.log(time_table);
=======
        time_table.push(dict_data);
>>>>>>> 668166fb69846599f32f661ae5b5012c3291b4f6:test/testFile/extractExamDates.test.js
    }
    fs.writeFile(
        path.join(__dirname,"examDates.json"),
        JSON.stringify(dict_data),
        (err,data) => 
        {
            if (err) throw Error(err);
            console.log('Data Created')
        }
    );
    process.on('error',err=>{
        console.error(`Error:${err}`);
        process.exit(1);
    });
}

