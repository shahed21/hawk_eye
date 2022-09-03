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

const positionProperty = new Cesium.SampledPositionProperty();
const orientationProperty = new Cesium.SampledProperty(Cesium.Quaternion);

setup_live_sse_connection(positionProperty, orientationProperty);

viewer.clock.shouldAnimate = true;

async function loadModel() {
  // Load the glTF model from Cesium ion.
  const airplaneUri = await Cesium.IonResource.fromAssetId(1257420);
  viewer.trackedEntity = viewer.entities.add({
    availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({start: start, stop: stop})]),
    position: positionProperty,
    model: {uri: airplaneUri, scale: 3.2 / 41.021, minimumPixelSize: 100.0},
    // Automatically compute the orientation from the position.
    orientation: orientationProperty,
    path: new Cesium.PathGraphics({width: 3})
  });
}

loadModel();