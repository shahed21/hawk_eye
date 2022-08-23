const express = require('express');
const missionController = require('../controllers/MissionController');

const router = express.Router();

async function httpRequestsHandler(req, res) {
    console.log(`httpRequestsHandler`);
    console.log(req.body);
    var response;

    switch(req.body.method) {
        case "addNewMission":
            response = await missionController.addNewMission(req.body.mission);
        break;
        case "getAllMissions":
            response = await missionController.getAllMissions();
        break;
        case "getMissionByMissionName":
            response = await missionController.getMissionByMissionName(req.body.missionName);
        break;
        case "getIdByMissionName":
            response = await missionController.getIdByMissionName(req.body.missionName);
        break;
        case "getMissionById":
            response = await missionController.getMissionById(req.body.id);
        break;
        case "deleteAllMissions":
            response = await missionController.deleteAllMissions();
        break;
        case "deleteMissionByMissionName":
            response = await missionController.deleteMissionByMissionName(req.body.missionName);
        break;
        case "deleteMissionById":
            response = await missionController.deleteMissionById(req.body.id);
        break;
        case "updateMissionById":
            response = await missionController.updateMissionById(
                req.body.missionName,
                req.body.updateMissionData);
        break;
        case "addViewerIdToMissionById":
            response = await missionController.addViewerIdToMissionById(
                req.body.missionId,
                req.body.viewerId);
        break;
        case "deleteViewerIdFromMissionById":
            response = await missionController.deleteViewerIdFromMissionById(
                req.body.missionId,
                req.body.viewerId);
        break;
        case "isViewerIdAuthorizedForMissionById":
            response = await missionController.isViewerIdAuthorizedForMissionById(
                req.body.missionId,
                req.body.viewerId);
        break;
        case "addNewVehicleToMissionById":
            response = await missionController.addNewVehicleToMissionById(
                req.body.missionId,
                req.body.vehicleId,
                req.body.pilotId);
        break;
        case "deleteVehicleFromMissionById":
            response = await missionController.deleteVehicleFromMissionById(
                req.body.missionId,
                req.body.vehicleId);
        break;
        case "addNewWayPointToMissionVehicleById":
            response = await missionController.addNewWayPointToMissionVehicleById(
                req.body.missionId,
                req.body.vehicleId,
                req.body.wayPoint);
        break;
        case "deleteWayPointFromMissionVehicleById":
            response = await missionController.deleteWayPointFromMissionVehicleById(
                req.body.missionId,
                req.body.vehicleId,
                req.body.wayPointId);
        break;
        case "swapWayPointsInMissionVehicleById":
            response = await missionController.swapWayPointsInMissionVehicleById(
                req.body.missionId,
                req.body.vehicleId,
                req.body.order1,
                req.body.order2);
        break;
        case "moveWayPointsInMissionVehicleById":
            response = await missionController.moveWayPointsInMissionVehicleById(
                req.body.missionId,
                req.body.vehicleId,
                req.body.startIndex,
                req.body.endIndex);
        break;
    }
    res.json(response);
}

router.get('/', httpRequestsHandler);

router.post('/', httpRequestsHandler);


module.exports = router;