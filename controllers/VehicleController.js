const Vehicle = require('../models/Vehicle');

async function addNewVehicle(newVehicle) {
    console.log(`addNewVehicle`);
    console.log(newVehicle);
    var response;
    const vehicle = new Vehicle({
        vehicleName: newVehicle.vehicleName,
        vehicleType: newVehicle.vehicleType,
        modelPath: newVehicle.modelPath,
        size: newVehicle.size,
        scale: newVehicle.scale,
        pilotId: newVehicle.pilotId,
        beingPiloted: newVehicle.beingPiloted
    });

    try {
        const savedVehicle = await vehicle.save();
        response = {
            success: true,
            data: savedVehicle
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
}

async function getAllVehicles() {
    console.log(`getAllVehicles`);
    var response;
    try{
        const vehicles = await Vehicle.find();
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getVehicleByVehicleName(vehicleName) {
    console.log(`getVehicleByVehicleName`);
    var response;
    try{
        const vehicles = await Vehicle.findOne({vehicleName: vehicleName});
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getIdByVehicleName(vehicleName) {
    console.log(`getIdByVehicleName`);
    var response;
    try{
        const vehicles = await Vehicle.findOne({vehicleName: vehicleName});
        response = {
            success: true,
            data: vehicles._id
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};


async function getVehicleById(id) {
    console.log(`getVehicleById`);
    var response;
    try{
        const vehicles = await Vehicle.findOne({_id: id});
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteAllVehicles() {
    console.log(`deleteAllVehicles`);
    var response;
    try{
        const vehicles = await Vehicle.deleteMany();
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteVehicleByVehicleName(vehicleName) {
    console.log(`deleteVehicleByVehicleName`);
    var response;
    try{
        const vehicles = await Vehicle.deleteOne({vehicleName: vehicleName});
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteVehicleById(id) {
    console.log(`deleteVehicleById`);
    var response;
    try{
        const vehicles = await Vehicle.deleteOne({_id: id});
        response = {
            success: true,
            data: vehicles
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function updateVehicleByVehicleName(vehicleName, updateVehicleData) {
    console.log(`updateVehicleByVehicleName`);
    console.log(updateVehicleData);
    console.log({vehicleName: vehicleName});
    var response;
    // const vehicle = new Vehicle();

    try {
        const savedVehicle = await Vehicle.updateOne(
                {vehicleName: vehicleName},
                {$set: updateVehicleData}
            );
        response = {
            success: true,
            data: savedVehicle
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
}


module.exports = {
    addNewVehicle,
    getAllVehicles,
    getVehicleByVehicleName,
    getIdByVehicleName,
    getVehicleById,
    deleteAllVehicles,
    deleteVehicleByVehicleName,
    deleteVehicleById,
    updateVehicleByVehicleName
};