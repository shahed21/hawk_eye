const sampledProperties = {};

function setupSampleProperties(sampledProperties) {
  sampledProperties['positionProperty'] = new Cesium.SampledPositionProperty();
  sampledProperties['orientationProperty'] = new Cesium.SampledProperty(Cesium.Quaternion);

  sampledProperties['rollDegrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['pitchDegrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['headingDegrees'] = new Cesium.SampledProperty(Number);

  sampledProperties['airspeed'] = {};
  sampledProperties['airspeed']['mps'] = new Cesium.SampledProperty(Number);
  sampledProperties['airspeed']['knots'] = new Cesium.SampledProperty(Number);
  sampledProperties['airspeed']['mph'] = new Cesium.SampledProperty(Number);
  sampledProperties['airspeed']['kph'] = new Cesium.SampledProperty(Number);
}

function getTimedDataSample(currentTime, sampledProperties, onTickData) {
  onTickData['rollDegrees'] = sampledProperties['rollDegrees'].getValue(currentTime);
  onTickData['pitchDegrees'] = sampledProperties['pitchDegrees'].getValue(currentTime);
  onTickData['headingDegrees'] = sampledProperties['headingDegrees'].getValue(currentTime);

  onTickData['airspeed']['mps']   = sampledProperties['airspeed']['mps'].getValue(currentTime);
  onTickData['airspeed']['knots'] = sampledProperties['airspeed']['knots'].getValue(currentTime);
  onTickData['airspeed']['mph']   = sampledProperties['airspeed']['mph'].getValue(currentTime);
  onTickData['airspeed']['kph']   = sampledProperties['airspeed']['kph'].getValue(currentTime);
}

const viewer = new Cesium.Viewer('cesiumContainer', {
  terrainProvider: Cesium.createWorldTerrain()
});
const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

const totalMinutes = 80;
// const totalMinutes = 80 - (7.35);
const start = Cesium.JulianDate.fromIso8601("1970-01-12T14:10:59Z");
// const start = Cesium.JulianDate.fromIso8601("1970-01-12T14:18:20Z");
const stop = Cesium.JulianDate.addMinutes(start, totalMinutes, new Cesium.JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.timeline.zoomTo(start, stop);
viewer.clock.multiplier = 1;

setupSampleProperties(sampledProperties);

setup_live_sse_connection(sampledProperties['positionProperty'], sampledProperties['orientationProperty']);

viewer.clock.shouldAnimate = true;

viewer.clock.onTick.addEventListener(function(clock) {
  const currentTime = clock.currentTime;
  getTimedDataSample(currentTime, sampledProperties, onTickData);
});

async function loadModel() {
  // Load the glTF model from Cesium ion.
  const airplaneUri = await Cesium.IonResource.fromAssetId(1257420);
  viewer.trackedEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({start: start, stop: stop})]),
    position: sampledProperties['positionProperty'],
    model: {uri: airplaneUri, scale: 3.2 / 41.021, minimumPixelSize: 100.0},
    // Automatically compute the orientation from the position.
    orientation: sampledProperties['orientationProperty'],
    path: new Cesium.PathGraphics({width: 3})
  });
}

loadModel();