function updateFlightData(jsondata) {
    const data = JSON.parse(jsondata);
    rollDegrees = data.euler0 * (180/Math.PI);
    pitchDegrees = data.euler1 * (180/Math.PI);
    headingDegrees = data.euler2 * (180/Math.PI);
}

function setup_live_sse_connection() {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = e => updateFlightData(e.data);
}
