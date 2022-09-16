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

    //Airspeed needs a LPF
    //Using a long IIR filter
    // airspeed['mps'] = + ((0.01) * (data.airspeed)) + ((0.99) * airspeed['mps']);
    // airspeed['knots'] = (1.943844) * (airspeed['mps']);
    // airspeed['kph'] = (3.6) * (airspeed['mps']);
    // airspeed['mph'] = (2.236936) * (airspeed['mps']);

    windspeed['mps'] = + (data.wind_vel);
    windspeed['knots'] = (1.943844) * (windspeed['mps']);
    windspeed['kph'] = (3.6) * (windspeed['mps']);
    windspeed['mph'] = (2.236936) * (windspeed['mps']);

    wind_direction['degrees'] = (data.wind_direction) * (180/Math.PI);
    wind_direction['radians'] = (data.wind_direction);

    track_angle['degrees'] = (data.track_angle) * (180/Math.PI);
    track_angle['radians'] = (data.track_angle);


    altitude['meters'] = +(data.Alt);
    altitude['feet'] = (3.28084) * (altitude['meters']);
    altitude['yards'] = (altitude['feet'])/3;

    groundSpeed['mps'] = Math.sqrt((data.vel_n) ** 2 +(data.vel_e) ** 2);
    groundSpeed['knots'] = (1.943844) * (groundSpeed['mps']);
    groundSpeed['kph'] = (3.6) * (groundSpeed['mps']);
    groundSpeed['mph'] = (2.236936) * (groundSpeed['mps']);

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
}

function setup_live_sse_connection(positionProperty, orientationProperty) {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = e => updateFlightData(e.data, positionProperty, orientationProperty);
}
