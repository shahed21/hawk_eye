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

    alpha['degrees'] = (data.alpha) * (180/Math.PI);
    beta['degrees'] = (data.beta) * (180/Math.PI);

    alpha['radians'] = (data.alpha);
    beta['radians'] = (data.beta);

    // windspeed['mps'] = + (data.wind_vel);
    // windspeed['knots'] = (1.943844) * (windspeed['mps']);
    // windspeed['kph'] = (3.6) * (windspeed['mps']);
    // windspeed['mph'] = (2.236936) * (windspeed['mps']);

    // wind_direction['degrees'] = (data.wind_direction) * (180/Math.PI);
    // wind_direction['radians'] = (data.wind_direction);

    // track_angle['degrees'] = (data.track_angle) * (180/Math.PI);
    // track_angle['radians'] = (data.track_angle);


    altitude['meters'] = +(data.Alt);
    altitude['feet'] = (3.28084) * (altitude['meters']);
    altitude['yards'] = (altitude['feet'])/3;


    vel_d['mps'] = + ( data.vel_d );
    vel_d['fps'] = (3.28084) * (vel_d['mps']);

    vel_xyz['0'] = data.vel_0;
    vel_xyz['x'] = data.vel_x;
    vel_xyz['y'] = data.vel_y;
    vel_xyz['z'] = data.vel_z;

    // const altitudeOffset = +(38);
    // data.alt_corrected = (+(data.alt_corrected)) + (altitudeOffset);

    const time = Cesium.JulianDate.fromIso8601(data.Time);
    // const position = Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat, data.alt_corrected);
    const position = Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat, data.Alt);
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);
    var hpRoll = new Cesium.HeadingPitchRoll(headingRadians, data.euler1, data.euler0);   
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position,hpRoll); 
    orientationProperty.addSample(time, orientation);

    sampledProperties['rollDegrees'].addSample(time, -(data.euler0) * (180/Math.PI));
    sampledProperties['pitchDegrees'].addSample(time, data.euler1 * (180/Math.PI));
    sampledProperties['headingDegrees'].addSample(time, data.euler2 * (180/Math.PI));

    sampledProperties['airspeed']['mps'].addSample(time, data.filtered_airspeed_mps);
    sampledProperties['airspeed']['knots'].addSample(time, data.filtered_airspeed_knots);
    sampledProperties['airspeed']['mph'].addSample(time, data.filtered_airspeed_mph);
    sampledProperties['airspeed']['kph'].addSample(time, data.filtered_airspeed_kph);

    sampledProperties['groundspeed']['mps'].addSample(time,   data.filtered_groundspeed_mps);
    sampledProperties['groundspeed']['knots'].addSample(time, data.filtered_groundspeed_knots);
    sampledProperties['groundspeed']['mph'].addSample(time,   data.filtered_groundspeed_mph);
    sampledProperties['groundspeed']['kph'].addSample(time,   data.filtered_groundspeed_kph);

    sampledProperties['windspeed']['mps'].addSample(time,   data.filtered_windspeed_mps);
    sampledProperties['windspeed']['knots'].addSample(time, data.filtered_windspeed_knots);
    sampledProperties['windspeed']['mph'].addSample(time,   data.filtered_windspeed_mph);
    sampledProperties['windspeed']['kph'].addSample(time,   data.filtered_windspeed_kph);

    sampledProperties['winddirection']['degrees'].addSample(time, data.filtered_winddir_deg);
    sampledProperties['winddirection']['radians'].addSample(time, data.filtered_winddir_rad);

    sampledProperties['groundtrackdirection']['degrees'].addSample(time, data.filtered_groundtrackdir_deg);
    sampledProperties['groundtrackdirection']['radians'].addSample(time, data.filtered_groundtrackdir_rad);
}

function setup_live_sse_connection(positionProperty, orientationProperty) {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = e => updateFlightData(e.data, positionProperty, orientationProperty);
}
