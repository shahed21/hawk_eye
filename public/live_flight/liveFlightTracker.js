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

  sampledProperties['groundspeed'] = {};
  sampledProperties['groundspeed']['mps'] = new Cesium.SampledProperty(Number);
  sampledProperties['groundspeed']['knots'] = new Cesium.SampledProperty(Number);
  sampledProperties['groundspeed']['mph'] = new Cesium.SampledProperty(Number);
  sampledProperties['groundspeed']['kph'] = new Cesium.SampledProperty(Number);

  sampledProperties['windspeed'] = {};
  sampledProperties['windspeed']['mps'] = new Cesium.SampledProperty(Number);
  sampledProperties['windspeed']['knots'] = new Cesium.SampledProperty(Number);
  sampledProperties['windspeed']['mph'] = new Cesium.SampledProperty(Number);
  sampledProperties['windspeed']['kph'] = new Cesium.SampledProperty(Number);

  sampledProperties['winddirection'] = {};
  sampledProperties['winddirection']['degrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['winddirection']['radians'] = new Cesium.SampledProperty(Number);

  sampledProperties['groundtrackdirection'] = {};
  sampledProperties['groundtrackdirection']['degrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['groundtrackdirection']['radians'] = new Cesium.SampledProperty(Number);

  sampledProperties['altitude'] = {};
  sampledProperties['altitude']['meters'] = new Cesium.SampledProperty(Number);
  sampledProperties['altitude']['feet'] = new Cesium.SampledProperty(Number);
  sampledProperties['altitude']['yards'] = new Cesium.SampledProperty(Number);

  sampledProperties['vel_d'] = {};
  sampledProperties['vel_d']['mps'] = new Cesium.SampledProperty(Number);
  sampledProperties['vel_d']['fps'] = new Cesium.SampledProperty(Number);

  sampledProperties['alpha'] = {};
  sampledProperties['alpha']['degrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['alpha']['radians'] = new Cesium.SampledProperty(Number);
  
  sampledProperties['beta'] = {};
  sampledProperties['beta']['degrees'] = new Cesium.SampledProperty(Number);
  sampledProperties['beta']['radians'] = new Cesium.SampledProperty(Number);
  
  sampledProperties['vel_xyz'] = {};
  sampledProperties['vel_xyz']['x'] = new Cesium.SampledProperty(Number);
  sampledProperties['vel_xyz']['y'] = new Cesium.SampledProperty(Number);
  sampledProperties['vel_xyz']['z'] = new Cesium.SampledProperty(Number);
}

function getTimedDataSample(currentTime, sampledProperties, onTickData) {
  onTickData['rollDegrees'                    ] = sampledProperties['rollDegrees'                    ].getValue(currentTime);
  onTickData['pitchDegrees'                   ] = sampledProperties['pitchDegrees'                   ].getValue(currentTime);
  onTickData['headingDegrees'                 ] = sampledProperties['headingDegrees'                 ].getValue(currentTime);

  onTickData['airspeed'            ]['mps'    ] = sampledProperties['airspeed'            ]['mps'    ].getValue(currentTime);
  onTickData['airspeed'            ]['knots'  ] = sampledProperties['airspeed'            ]['knots'  ].getValue(currentTime);
  onTickData['airspeed'            ]['mph'    ] = sampledProperties['airspeed'            ]['mph'    ].getValue(currentTime);
  onTickData['airspeed'            ]['kph'    ] = sampledProperties['airspeed'            ]['kph'    ].getValue(currentTime);
  
  onTickData['groundspeed'         ]['mps'    ] = sampledProperties['groundspeed'         ]['mps'    ].getValue(currentTime);
  onTickData['groundspeed'         ]['knots'  ] = sampledProperties['groundspeed'         ]['knots'  ].getValue(currentTime);
  onTickData['groundspeed'         ]['mph'    ] = sampledProperties['groundspeed'         ]['mph'    ].getValue(currentTime);
  onTickData['groundspeed'         ]['kph'    ] = sampledProperties['groundspeed'         ]['kph'    ].getValue(currentTime);
  
  onTickData['windspeed'           ]['mps'    ] = sampledProperties['windspeed'           ]['mps'    ].getValue(currentTime);
  onTickData['windspeed'           ]['knots'  ] = sampledProperties['windspeed'           ]['knots'  ].getValue(currentTime);
  onTickData['windspeed'           ]['mph'    ] = sampledProperties['windspeed'           ]['mph'    ].getValue(currentTime);
  onTickData['windspeed'           ]['kph'    ] = sampledProperties['windspeed'           ]['kph'    ].getValue(currentTime);
  
  onTickData['winddirection'       ]['degrees'] = sampledProperties['winddirection'       ]['degrees'].getValue(currentTime);
  onTickData['winddirection'       ]['radians'] = sampledProperties['winddirection'       ]['radians'].getValue(currentTime);
  
  onTickData['groundtrackdirection']['degrees'] = sampledProperties['groundtrackdirection']['degrees'].getValue(currentTime);
  onTickData['groundtrackdirection']['radians'] = sampledProperties['groundtrackdirection']['radians'].getValue(currentTime);
  
  onTickData['altitude'            ]['meters' ] = sampledProperties['altitude'            ]['meters' ].getValue(currentTime);
  onTickData['altitude'            ]['feet'   ] = sampledProperties['altitude'            ]['feet'   ].getValue(currentTime);
  onTickData['altitude'            ]['yards'  ] = sampledProperties['altitude'            ]['yards'  ].getValue(currentTime);
  
  onTickData['vel_d'               ]['mps'    ] = sampledProperties['vel_d'               ]['mps'    ].getValue(currentTime);
  onTickData['vel_d'               ]['fps'    ] = sampledProperties['vel_d'               ]['fps'    ].getValue(currentTime);
  
  onTickData['alpha'               ]['degrees'] = sampledProperties['alpha'               ]['degrees'].getValue(currentTime);
  onTickData['alpha'               ]['radians'] = sampledProperties['alpha'               ]['radians'].getValue(currentTime); 
  
  onTickData['beta'                ]['degrees'] = sampledProperties['beta'                ]['degrees'].getValue(currentTime);
  onTickData['beta'                ]['radians'] = sampledProperties['beta'                ]['radians'].getValue(currentTime);
  
  onTickData['vel_xyz'             ]['x'      ] = sampledProperties['vel_xyz'             ]['x'      ].getValue(currentTime);
  onTickData['vel_xyz'             ]['y'      ] = sampledProperties['vel_xyz'             ]['y'      ].getValue(currentTime);
  onTickData['vel_xyz'             ]['z'      ] = sampledProperties['vel_xyz'             ]['z'      ].getValue(currentTime);

  if (isNaN(onTickData['altitude'            ]['meters' ])) {
    console.log(onTickData['altimeter']);
  }
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