const express = require('express');
const { parse } = require('csv-parse')
const fs = require('fs') 


const csvFilePath='data/new_small_data.csv';
// const csvFilePath='data/new_small_data2.csv';
const port = 5000;
const app = express();
const data = [];
var jsonDataIndex = 1;
var filtered_airspeed = 0;
var filtered_groundspeed = 0;
var filtered_windspeed = 0;
var filtered_winddir = 0;
var filtered_groundtrackdir = 0;

function prepareMessage(res, jsonData, startTime) {
  const currTime = Date.now();
  while( (parseInt( jsonData[jsonDataIndex].DeltaTimeMS )) <= ( currTime - startTime )) {
  // while( (parseInt( jsonData[jsonDataIndex].DeltaTimeMS )-(440020)) <= ( currTime - startTime )) {
    res.write( `data: ${ JSON.stringify( jsonData[jsonDataIndex] ) }\n\n` );
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

alpha_filter = 0;
beta_filter = 0;

function hamilton(u,v, prod) {
  prod[0] = u[0]*v[0] - u[1]*v[1] - u[2]*v[2] - u[3]*v[3];
  prod[1] = u[0]*v[1] + u[1]*v[0] + u[2]*v[3] - u[3]*v[2];
  prod[2] = u[0]*v[2] - u[1]*v[3] + u[2]*v[0] + u[3]*v[1];
  prod[3] = u[0]*v[3] + u[1]*v[2] - u[2]*v[1] + u[3]*v[0];
}

function conjugate(q, conj) {
  conj[0] = q[0];
  conj[1] = -q[1];
  conj[2] = -q[2];
  conj[3] = -q[3];
}

function getVel_b_alpha_beta_quat(rowData) {
  q = [rowData['Q0'], rowData['Q1'], rowData['Q2'], rowData['Q3']];
  vel_ned = [0, rowData['vel_n'], rowData['vel_e'], rowData['vel_d']];
  qstar = [];
  conjugate(q, qstar);
  mid_level = [];
  hamilton(qstar, vel_ned, mid_level);
  vel_xyz = [];
  hamilton(mid_level, q, vel_xyz);

  rowData['vel_0'] = vel_xyz[0];
  rowData['vel_x'] = vel_xyz[1];
  rowData['vel_y'] = vel_xyz[2];
  rowData['vel_z'] = vel_xyz[3];

  rowData['vel'] = Math.sqrt((rowData['vel_x'])**2 + (rowData['vel_y'])**2 + (rowData['vel_z'])**2);

  // Angle of Attack
  alpha_filter = 0.03 * Math.atan2((rowData['vel_z']), (rowData['vel_x'])) + 0.97 * alpha_filter;

  // Slip Angle
  beta_filter = 0.03 * Math.asin((rowData['vel_y'])/(rowData['vel'])) + 0.97 * beta_filter;

  if ((rowData['vel']) < 0.3) {
    alpha_filter = 0;
    beta_filter = 0;
  }

  rowData['alpha'] = alpha_filter;
  rowData['beta'] = beta_filter;

  airvel_xyz = [0, (rowData['airspeed']), 0, 0];
  mid_level_vec = [];
  airvel_ned = [];

  hamilton(q, airvel_xyz, mid_level_vec);
  hamilton(mid_level_vec, qstar, airvel_ned);

  const wind_vel_n = rowData['vel_n'] - airvel_ned[1];
  const wind_vel_e = rowData['vel_e'] - airvel_ned[2];

  filtered_windspeed = ((0.01) * (Math.sqrt((wind_vel_n)**2 + (wind_vel_e)**2 ))) + ((0.99) * (filtered_windspeed));

  rowData['filtered_windspeed_mps'] =                 filtered_windspeed;
  rowData['filtered_windspeed_knots'] = (1.943844) * (filtered_windspeed);
  rowData['filtered_windspeed_kph'] = (3.6) *        (filtered_windspeed);
  rowData['filtered_windspeed_mph'] = (2.236936) *   (filtered_windspeed);

  rowData['filtered_winddir_rad'] =                   (Math.atan2(-(wind_vel_e), -(wind_vel_n)));
  rowData['filtered_winddir_deg'] = (180/Math.PI) *  (rowData['filtered_winddir_rad']);

  if ((rowData['filtered_groundspeed_mps'])<0.15) {
    rowData['filtered_groundtrackdir_rad'] = 0;
  } else {
    rowData['filtered_groundtrackdir_rad'] = (Math.atan2((rowData['vel_e']), (rowData['vel_n'])));
  }

  rowData['filtered_groundtrackdir_deg'] = (180/Math.PI) *  (rowData['filtered_groundtrackdir_rad']);
}

function getAirspeeds(rowData) {
  filtered_airspeed = + ((0.01) * (rowData['airspeed'])) + ((0.99) * (filtered_airspeed));
  rowData['filtered_airspeed_mps'] = filtered_airspeed;
  rowData['filtered_airspeed_knots'] = (1.943844) * (filtered_airspeed);
  rowData['filtered_airspeed_kph'] = (3.6) * (filtered_airspeed);
  rowData['filtered_airspeed_mph'] = (2.236936) * (filtered_airspeed);

  // console.log(rowData['airspeed']);
  // console.log(rowData['filtered_airspeed_mps']);
}

function getGroundspeeds(rowData) {
  const gs = Math.sqrt((rowData.vel_n) ** 2 +(rowData.vel_e) ** 2);
  filtered_groundspeed = + ((0.01) * (gs)) + ((0.99) * (filtered_groundspeed));
  rowData['filtered_groundspeed_mps'] = filtered_groundspeed;
  rowData['filtered_groundspeed_knots'] = (1.943844) * (filtered_groundspeed);
  rowData['filtered_groundspeed_kph'] = (3.6) * (filtered_groundspeed);
  rowData['filtered_groundspeed_mph'] = (2.236936) * (filtered_groundspeed);
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

            //This is where we should add more data
            getAirspeeds(rowData);
            getGroundspeeds(rowData);
            getVel_b_alpha_beta_quat(rowData);

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


