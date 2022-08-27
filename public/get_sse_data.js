var rollDegrees = 0;
var pitchDegrees = 0;
var headingDegrees = 0;

function updateFlightData(jsondata) {
    // console.log(jsondata);
    const data = JSON.parse(jsondata);
    rollDegrees = data.euler0 * (180/Math.PI);
    pitchDegrees = data.euler1 * (180/Math.PI);
    headingDegrees = data.euler2 * (180/Math.PI);

    // console.log(data);

    // console.log(rollDegrees);
    // console.log(pitchDegrees);
    // console.log(headingDegrees);
}

let eventSource = new EventSource("http://localhost:5000/stream");
eventSource.onmessage = e => updateFlightData(e.data);