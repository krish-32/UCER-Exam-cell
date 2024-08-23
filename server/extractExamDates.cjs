//const fs = require('fs');
let dict_data={};
let i, j;


async function constructExamDatesFromPDF(pdf) {
    for (j = 0; j <pdf.Pages.length; j++) {
        // let dict_data={};
        let count=0;
        for (i = 0; i <= pdf.Pages[j].Texts.length - 1; i++) {
            if(pdf.Pages[j].Texts[i].R[0].T==="Branch%20Name"){
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
                    let sorted_array=[];
                    if(date<i+count+count+count){
                        let date_data=pdf.Pages[j].Texts[date].R[0].T;
                        date=date+1;
                        let k=0;
                        if(dict_data[date_data]){
                            dict_data[date_data]=dict_data[date_data]+","+pdf.Pages[j].Texts[sub+k].R[0].T
                            arr=dict_data[date_data].split(",");
                        }else {
                            while(date_data==pdf.Pages[j].Texts[date].R[0].T){
                       
                                arr.push(pdf.Pages[j].Texts[sub+k].R[0].T)
                                date_data=pdf.Pages[j].Texts[date].R[0].T
                                date=date+1;
                                sub=sub+1;
                            }
                            
                            arr.push(pdf.Pages[j].Texts[sub].R[0].T)
                            
                        }
                        //eliminating the dublicates in array
                        sorted_array = Array.from(new Set(arr));
                        dict_data[date_data]=sorted_array ;
                    }
                }
            }
            
        }
        // const TimeTable={
        //     department:department,
        //     date:dict_data
        // }
        //time_table.push(TimeTable);
        
    }
    return dict_data;
    // fs.writeFile(
    //     path.join(__dirname,"output_files","examDates.json"),
    //     JSON.stringify(dict_data),
    //     (err,data) => 
    //     {
    //         if (err) throw Error(err);
    //         console.log('Data Created')
    //     }
    // );
    // process.on('error',err=>{
    //     console.error(`Error:${err}`);
    //     process.exit(1);
    // });
}
module.exports =constructExamDatesFromPDF;



