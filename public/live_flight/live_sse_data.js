function updateFlightData(jsondata, positionProperty, orientationProperty) {
    const data = JSON.parse(jsondata);
    headingRadians =  (data.euler2-(Math.PI/2));
    if (headingRadians>Math.PI) {
        headingRadians-= 2*Math.PI;
    } else {
        if (headingRadians<Math.PI) {
            headingRadians+= 2* Math.PI;
        }
    }

    const time = Cesium.JulianDate.fromIso8601(data.Time);
    // const position = Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat, data.alt_corrected);
    const position = Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat, data.Alt);
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);
    var hpRoll = new Cesium.HeadingPitchRoll(headingRadians, data.euler1, data.euler0);   
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position,hpRoll); 
    orientationProperty.addSample(time, orientation);

    sampledProperties['rollDegrees'                    ].addSample(time, -(data.euler0) * (180/Math.PI));
    sampledProperties['pitchDegrees'                   ].addSample(time, data.euler1 * (180/Math.PI));
    sampledProperties['headingDegrees'                 ].addSample(time, data.euler2 * (180/Math.PI));

    sampledProperties['airspeed'            ]['mps'    ].addSample(time, data.filtered_airspeed_mps);
    sampledProperties['airspeed'            ]['knots'  ].addSample(time, data.filtered_airspeed_knots);
    sampledProperties['airspeed'            ]['mph'    ].addSample(time, data.filtered_airspeed_mph);
    sampledProperties['airspeed'            ]['kph'    ].addSample(time, data.filtered_airspeed_kph);
    
    sampledProperties['groundspeed'         ]['mps'    ].addSample(time, data.filtered_groundspeed_mps);
    sampledProperties['groundspeed'         ]['knots'  ].addSample(time, data.filtered_groundspeed_knots);
    sampledProperties['groundspeed'         ]['mph'    ].addSample(time, data.filtered_groundspeed_mph);
    sampledProperties['groundspeed'         ]['kph'    ].addSample(time, data.filtered_groundspeed_kph);
    
    sampledProperties['windspeed'           ]['mps'    ].addSample(time, data.filtered_windspeed_mps);
    sampledProperties['windspeed'           ]['knots'  ].addSample(time, data.filtered_windspeed_knots);
    sampledProperties['windspeed'           ]['mph'    ].addSample(time, data.filtered_windspeed_mph);
    sampledProperties['windspeed'           ]['kph'    ].addSample(time, data.filtered_windspeed_kph);
    
    sampledProperties['winddirection'       ]['degrees'].addSample(time, data.filtered_winddir_deg);
    sampledProperties['winddirection'       ]['radians'].addSample(time, data.filtered_winddir_rad);
    
    sampledProperties['groundtrackdirection']['degrees'].addSample(time, data.filtered_groundtrackdir_deg);
    sampledProperties['groundtrackdirection']['radians'].addSample(time, data.filtered_groundtrackdir_rad);

    sampledProperties['altitude'            ]['meters' ].addSample(time, data.Alt);
    sampledProperties['altitude'            ]['feet'   ].addSample(time, (3.28084) * (data.Alt));
    sampledProperties['altitude'            ]['yards'  ].addSample(time, (data.Alt)/3);

    sampledProperties['vel_d'               ]['mps'    ].addSample(time, data.vel_d);
    sampledProperties['vel_d'               ]['fps'    ].addSample(time, (3.28084) * (data.vel_d));

    sampledProperties['alpha'               ]['degrees'].addSample(time, (data.alpha) * (180/Math.PI));
    sampledProperties['alpha'               ]['radians'].addSample(time, (data.alpha));

    sampledProperties['beta'                ]['degrees'].addSample(time, (data.beta) * (180/Math.PI));
    sampledProperties['beta'                ]['radians'].addSample(time, (data.beta));
    
    sampledProperties['vel_xyz'             ]['x'      ].addSample(time, data.vel_x);
    sampledProperties['vel_xyz'             ]['y'      ].addSample(time, data.vel_y);
    sampledProperties['vel_xyz'             ]['z'      ].addSample(time, data.vel_z);
  }

function setup_live_sse_connection(positionProperty, orientationProperty) {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = e => updateFlightData(e.data, positionProperty, orientationProperty);
}
