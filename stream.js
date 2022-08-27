const express = require('express');
const { parse } = require('csv-parse')
const fs = require('fs') 


const csvFilePath='small_data.csv';
const port = 5000;
const app = express();
const data = [];
var jsonDataIndex = 1;

function prepareMessage(res, jsonData, startTime) {
    const currTime = Date.now();
    while( parseInt( jsonData[jsonDataIndex].DeltaTimeMS ) <= ( currTime - startTime )) {
        res.write( `data: ${ JSON.stringify( jsonData[jsonDataIndex] ) }\n\n` );
        // console.log(`data: ${ JSON.stringify( jsonData[jsonDataIndex] ) }`);
        // console.log(jsonData[jsonDataIndex].DeltaTimeMS);
        jsonDataIndex++;
    }
}

function setupServer(jsonData) {
    app.get("/stream", (req, res) => {
        console.log("New Connection!");
        res.set({
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
      
          // enabling CORS
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        });
      
        // setInterval(() => {
        //   res.write(`data: ${JSON.stringify(getData())}\n\n`)
        // }, 2000);
    
        const startTime = Date.now(); // in ms
    
        let eventInterval = setInterval(() => {
            prepareMessage(res, jsonData, startTime);
          }, 2);
        
        req.on('close', (err) => {
            clearInterval(eventInterval);
            res.end();
            });
    });
    
    //LISTENER
    app.listen(port, ()=>{
        console.log(`Listening on ${port}`);
    });
}


fs.createReadStream(csvFilePath)
  .pipe(parse({ delimiter: ',' }))
  .on('data', (r) => {
    data.push(r);        
  })
  .on('end', () => {
    console.log(`Done Reading!`);
    var index = 0;
    var colHeaders;
    const jsonData = []
    data.forEach(row => {
        if (!index) {
            colHeaders = row;
        } else {
            const rowData = {};
            var j = 0;
            row.forEach(element => {
                rowData[colHeaders[j]] = element;
                j++;
            });
            jsonData.push(rowData);
        }
        index++;
    });
    console.log(`Done Formatting!`);

    setupServer(jsonData);

  });





// function getData() {
//     const data = {
//         euler0 : (Math.random()-0.5) * 15 * Math.PI/180,
//         euler1 : (Math.random()-0.5) * 5 * Math.PI/180,
//         euler2 : (Math.random()-0.5) * 75 * Math.PI/180
//     };
//     return data;
// }


