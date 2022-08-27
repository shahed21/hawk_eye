// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
var terrainProvider = Cesium.createWorldTerrain();
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: terrainProvider
});
// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());

var wayPointArray = [];
var wayPointEntityArray = [];
var editWayPointIndex = -1;

function updateWaypoint(wayPointIndex) {
    wayPointArray[wayPointIndex].latitude = parseFloat(document.getElementById("latitude").value);
    wayPointArray[wayPointIndex].longitude = parseFloat(document.getElementById("longitude").value);
    wayPointArray[wayPointIndex].height = parseFloat(document.getElementById("height").value);
    wayPointArray[wayPointIndex].radius = parseFloat(document.getElementById("radius").value);

    viewer.entities.remove(wayPointEntityArray[wayPointIndex]);

    const redSphere = viewer.entities.add({
        name: "Red sphere",
        position: Cesium.Cartesian3.fromDegrees(
            wayPointArray[wayPointIndex].longitude,
            wayPointArray[wayPointIndex].latitude,
            wayPointArray[wayPointIndex].height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(wayPointArray[wayPointIndex].radius, wayPointArray[wayPointIndex].radius, wayPointArray[wayPointIndex].radius),    // TODO: make radii configurable
            material: new Cesium.Color(1.0, 0.0, 0.0, 0.5),    // TODO: make color configurable
            outline: false,
            // outlineColor: Cesium.Color.BLACK,
        },
    });

    wayPointEntityArray.splice(wayPointIndex, 1, redSphere);

    clearWaypoint();
    updateWayPointList();
}

function deleteWaypoint(wayPointIndex) {
    viewer.entities.remove(wayPointEntityArray[wayPointIndex]);
    wayPointArray.splice(wayPointIndex, 1);
    wayPointEntityArray.splice(wayPointIndex, 1);
    clearWaypoint();
    updateWayPointList();
}

function editWayPoint(wayPointIndex) {
    // console.log(wayPointArray[wayPointIndex].latitude);
    // console.log(wayPointArray[wayPointIndex].longitude);
    // console.log(wayPointArray[wayPointIndex].height);
    editWayPointIndex = wayPointIndex;

    viewer.camera.flyTo({
        // destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        destination : Cesium.Cartesian3.fromDegrees(
            wayPointArray[wayPointIndex].longitude,
            wayPointArray[wayPointIndex].latitude,
            wayPointArray[wayPointIndex].height),
        // orientation : {
        //   heading : Cesium.Math.toRadians(0.0),
        //   pitch : Cesium.Math.toRadians(-20.0),
        // }
    });
    const contextMenuDivTag = document.getElementById("contextMenu");
    contextMenuDivTag.innerHTML = `
<form>
  <label for="latitude">Latitude:</label><br/>
  <input type="text" id="latitude" name="latitude" value="${wayPointArray[wayPointIndex].latitude}"><br/>
  <label for="longitude">Longitude:</label><br/>
  <input type="text" id="longitude" name="longitude" value="${wayPointArray[wayPointIndex].longitude}"><br/>
  <label for="height">Height:</label><br/>
  <input type="text" id="height" name="height" value="${wayPointArray[wayPointIndex].height}"><br/>
  <label for="radius">Radius:</label><br/>
  <input type="text" id="radius" name="radius" value="${wayPointArray[wayPointIndex].radius}"><br/>

  <input type="button" id="editwaypoint" name="editWaypointBtn" value="Update WayPoint" onclick="updateWaypoint(${wayPointIndex})">
  <input type="button" id="deletewaypoint" name="deleteWaypointBtn" value="Delete" onclick="deleteWaypoint(${wayPointIndex})">
  <input type="button" id="clearwaypoint" name="clearWaypointBtn" value="Clear" onclick="clearWaypoint()"><br/>
</form>
    `;
}

function updateWayPointList() {
    const list= document.getElementById("wayPointList");
    list.innerHTML = ``;
    for (let i=0; i<wayPointArray.length; i++) {
        list.innerHTML += `
        <li><div onclick="editWayPoint(${i})">${wayPointArray[i].latitude.toFixed(5)}, ${wayPointArray[i].longitude.toFixed(5)}, ${wayPointArray[i].height.toFixed(2)}</div></li>
      `;
    }
}

function addWaypoint() {
    let latitude=
        parseFloat(document.getElementById("latitude").value);
    let longitude= parseFloat(document.getElementById("longitude").value);
    let height= parseFloat(document.getElementById("height").value);
    let radius= parseFloat(document.getElementById("radius").value);

    let wayPoint = {
        latitude: latitude,
        longitude: longitude,
        height: height,
        radius: radius
    };

    const redSphere = viewer.entities.add({
        name: "Red sphere",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        ellipsoid: {
            radii: new Cesium.Cartesian3(radius, radius, radius),    // TODO: make radii configurable
            material: new Cesium.Color(1.0, 0.0, 0.0, 0.5),    // TODO: make color configurable
            outline: false,
            // outlineColor: Cesium.Color.BLACK,
        },
    });

    wayPointArray.push(wayPoint);
    wayPointEntityArray.push(redSphere);
    updateWayPointList();
}

function clearWaypoint() {
    const contextMenuDivTag = document.getElementById("contextMenu");
    contextMenuDivTag.innerHTML = ``;
    editWayPointIndex = -1;
}

viewer.scene.canvas.addEventListener("contextmenu", function (event) {
    var ellipsoid = viewer.scene.globe.ellipsoid;
    // console.log("position " + event.clientX);
    var position = new Cesium.Cartesian2(event.clientX, event.clientY);
    // var pickedObject = viewer.scene.pick(position);
    var cartesian = viewer.camera.pickEllipsoid(position, ellipsoid);
    // console.log("cart ", cartesian);
    var cartographic = ellipsoid.cartesianToCartographic(cartesian);

    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    // var terrainHeightString = Cesium.Math.toDegrees(cartographic.height);

    const contextMenuDivTag = document.getElementById("contextMenu");

    if (editWayPointIndex === -1) {
        contextMenuDivTag.innerHTML = `
<form>
  <label for="latitude">Latitude:</label><br/>
  <input type="text" id="latitude" name="latitude" value="${latitudeString}"><br/>
  <label for="longitude">Longitude:</label><br/>
  <input type="text" id="longitude" name="longitude" value="${longitudeString}"><br/>
  <label for="height">Height:</label><br/>
  <input type="text" id="height" name="height" value="400"><br/>
  <label for="radius">Radius:</label><br/>
  <input type="text" id="radius" name="radius" value="30"><br/>
  <input type="button" id="addwaypoint" name="addWaypointBtn" value="Add WayPoint" onclick="addWaypoint()">
  <input type="button" id="clearwaypoint" name="clearWaypointBtn" value="Clear" onclick="clearWaypoint()"><br/>
</form>
    `;
    } else {
        contextMenuDivTag.innerHTML = `
<form>
  <label for="latitude">Latitude:</label><br/>
  <input type="text" id="latitude" name="latitude" value="${latitudeString}"><br/>
  <label for="longitude">Longitude:</label><br/>
  <input type="text" id="longitude" name="longitude" value="${longitudeString}"><br/>
  <label for="height">Height:</label><br/>
  <input type="text" id="height" name="height" value="${wayPointArray[editWayPointIndex].height}"><br/>
  <label for="radius">Radius:</label><br/>
  <input type="text" id="radius" name="radius" value="${wayPointArray[editWayPointIndex].radius}"><br/>

  <input type="button" id="editwaypoint" name="editWaypointBtn" value="Update WayPoint" onclick="updateWaypoint(${editWayPointIndex})">
  <input type="button" id="deletewaypoint" name="deleteWaypointBtn" value="Delete" onclick="deleteWaypoint(${editWayPointIndex})">
  <input type="button" id="clearwaypoint" name="clearWaypointBtn" value="Clear" onclick="clearWaypoint()"><br/>
</form>
    `;
    }
    // console.log("long " + longitudeString);
    // console.log("lat " + latitudeString);
});