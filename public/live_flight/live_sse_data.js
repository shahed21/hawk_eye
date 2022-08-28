function updateFlightData(jsondata, positionProperty, orientationProperty) {
    const data = JSON.parse(jsondata);
    rollDegrees = -data.euler0 * (180/Math.PI);
    pitchDegrees = data.euler1 * (180/Math.PI);
    headingDegrees = data.euler2 * (180/Math.PI);
    headingRadians =  (data.euler2-(Math.PI/2));
    if (headingRadians>Math.PI) {
        headingRadians-= 2*Math.PI;
    } else {
        if (headingRadians<Math.PI) {
            headingRadians+= 2* Math.PI;
        }
    }

    const time = Cesium.JulianDate.fromIso8601(data.Time);
    const position = Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat, data.alt_corrected);
    // Store the position along with its timestamp.
    // Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
    positionProperty.addSample(time, position);
    var hpRoll = new Cesium.HeadingPitchRoll(headingRadians, data.euler1, data.euler0);   
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position,hpRoll); 
    orientationProperty.addSample(time, orientation); 
}

function setup_live_sse_connection(positionProperty, orientationProperty) {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = e => updateFlightData(e.data, positionProperty, orientationProperty);
}
