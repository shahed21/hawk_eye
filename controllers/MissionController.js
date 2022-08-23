const MissionWayPoint = require('../models/MissionWayPoint');
const Mission = require('../models/Mission');
const swap = require('arr-swap');
const arrayMoveImmutable = require('array-move');

async function addNewMission(newMission) {
    console.log(`addNewMission`);
    console.log(newMission);
    var response;
    const mission = new Mission({
        missionName: newMission.missionName,
        missionAdminId: newMission.missionAdminId
    });

    let viewerIdIdx=0;
    newMission.viewerIdsAuthorized.forEach(viewerId => {
        mission.viewerIdsAuthorized.set(viewerIdIdx, viewerId);
        viewerIdIdx++;
    });

    let vehicleIdx=0;
    newMission.vehicles.forEach(vehicle => {
        mission.vehicles.set(vehicleIdx, vehicle);
        vehicleIdx++;
    });

    try {
        const savedMission = await mission.save();
        response = {
            success: true,
            data: savedMission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getAllMissions() {
    console.log(`getAllMissions`);
    var response;
    try{
        const missions = await Mission.find();
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getMissionByMissionName(missionName) {
    console.log(`getMissionByMissionName`);
    var response;
    try{
        const missions = await Mission.findOne({missionName: missionName});
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getIdByMissionName(missionName) {
    console.log(`getIdByMissionName`);
    var response;
    try{
        const missions = await Mission.findOne({missionName: missionName});
        response = {
            success: true,
            data: missions._id
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getMissionById(id) {
    console.log(`getMissionById`);
    var response;
    try{
        const missions = await Mission.findOne({_id: id});
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteAllMissions() {
    console.log(`deleteAllMissions`);
    var response;
    try{
        const missions = await Mission.deleteMany();
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteMissionByMissionName(missionName) {
    console.log(`deleteMissionByMissionName`);
    var response;
    try{
        const missions = await Mission.deleteOne({missionName: missionName});
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteMissionById(id) {
    console.log(`deleteMissionById`);
    var response;
    try{
        const missions = await Mission.deleteOne({_id: id});
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function updateMissionById(id, updateMissionData) {
    console.log(`updateMissionById`);
    console.log(updateMissionData);
    console.log({id: id});
    var response;
    // const mission = new Mission();

    try {
        const savedMission = await Mission.updateOne(
                {_id: id},
                {$set: updateMissionData}
            );
        response = {
            success: true,
            data: savedMission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function addViewerIdToMissionById(missionId, viewerId) {
    var response;
    try{
        const savedMission = await Mission.updateOne(
            {_id: missionId},
            [{$set: 
                {viewerIdsAuthorized: 
                    { $concatArrays: 
                        [
                            "$viewerIdsAuthorized", 
                            [viewerId]
                        ]
                    }
                }
            }]
        );
        response = {
            success: true,
            data: savedMission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteViewerIdFromMissionById(missionId, viewerId) {
    var response;
    try{
        const missions = await Mission.updateOne(
            {_id: missionId},
            [{ $pullAll: { viewerIdsAuthorized: viewerId} }]
        );
        response = {
            success: true,
            data: missions
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function isViewerIdAuthorizedForMissionById(missionId, viewerId) {
    var response;
    try{
        const missions = await Mission.findOne({_id: missionId});
        const authorized = (missions.viewerIdsAuthorized.indexOf(viewerId) !== -1);
        const dataOut = {viewAuthorized: authorized};
        response = {
            success: true,
            data: dataOut
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function addNewVehicleToMissionById(missionId, vehicleId, pilotId) {
    var response;
    try{
        const mission = await Mission.updateOne(
            {_id: missionId},
            [{$set: 
                {vehicles: 
                    { $concatArrays: 
                        [
                            "$vehicles", 
                            [{
                                vehicleId: vehicleId,
                                pilotId: pilotId
                            }]
                        ]
                    }
                }
            }]
        );
        response = {
            success: true,
            data: mission
        };

    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteVehicleFromMissionById(missionId, vehicleId) {
    var response;
    try{
        const mission = await Mission.updateOne(
            {_id: missionId},
            [{ $pullAll: { vehicles: { _id: vehicleId} } }]
        );
        response = {
            success: true,
            data: mission
        };

    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function addNewWayPointToMissionVehicleById(missionId, vehicleId, wayPoint) {
    var response;
    try{
        const missionWayPoint = new MissionWayPoint({
            missionWayPointName: wayPoint.missionWayPointName,
            wayPointType: wayPoint.wayPointType,
            latitude: wayPoint.latitude,
            longitude: wayPoint.longitude,
            altitude: wayPoint.altitude,
            dimension: wayPoint.dimension,
            heading: wayPoint.heading
        });
        const mission = await Mission.updateOne(
            {_id: missionId, "vehicles" : {vehicleId: vehicleId}},
            [{$set: 
                {wayPoints: 
                    { $concatArrays: 
                        [
                            "$wayPoints", 
                            [missionWayPoint]
                        ]
                    }
                }
            }]
        );
        response = {
            success: true,
            data: mission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteWayPointFromMissionVehicleById(missionId, vehicleId, wayPointId) {
    var response;
    try{
        const mission = await Mission.updateOne(
            {_id: missionId, "vehicles" : {vehicleId: vehicleId}},
            [{
                $pullAll: {
                    wayPoints: [{_id: wayPointId}]
                }
            }]
        );
        response = {
            success: true,
            data: mission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function swapWayPointsInMissionVehicleById(missionId, vehicleId, order1, order2) {
    var response;
    try{
        var vehicle = await Mission.findOne({_id: missionId, "vehicles" : {vehicleId: vehicleId}});
        const newWayPoints= swap(vehicle.wayPoints, order1, order2);
        const mission = await Mission.updateOne(
            {_id: missionId, "vehicles" : {vehicleId: vehicleId}},
            [{$set: 
                {wayPoints: newWayPoints}
            }]
        );
        response = {
            success: true,
            data: mission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function moveWayPointsInMissionVehicleById(missionId, vehicleId, startIndex, endIndex) {
    var response;
    try{
        var vehicle = await Mission.findOne({_id: missionId, "vehicles" : {vehicleId: vehicleId}});
        const newWayPoints=arrayMoveImmutable(vehicle.wayPoints, startIndex, endIndex);
        const mission = await Mission.updateOne(
            {_id: missionId, "vehicles" : {vehicleId: vehicleId}},
            [{$set: 
                {wayPoints: newWayPoints}
            }]
        );
        response = {
            success: true,
            data: mission
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

module.exports = {
    addNewMission,
    getAllMissions,
    getMissionByMissionName,
    getIdByMissionName,
    getMissionById,
    deleteAllMissions,
    deleteMissionByMissionName,
    deleteMissionById,
    updateMissionById,
    addViewerIdToMissionById,
    deleteViewerIdFromMissionById,
    isViewerIdAuthorizedForMissionById,
    addNewVehicleToMissionById,
    deleteVehicleFromMissionById,
    addNewWayPointToMissionVehicleById,
    deleteWayPointFromMissionVehicleById,
    swapWayPointsInMissionVehicleById,
    moveWayPointsInMissionVehicleById
};