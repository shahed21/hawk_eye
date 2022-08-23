const express = require('express');
const vehicleController = require('../controllers/VehicleController');

const router = express.Router();

async function httpRequestsHandler(req, res) {
    console.log(`httpRequestsHandler`);
    console.log(req.body);
    var response;

    switch(req.body.method) {
        case "addNewVehicle":
            response = await vehicleController.addNewVehicle(req.body.vehicle);
        break;
        case "getAllVehicles":
            response = await vehicleController.getAllVehicles();
        break;
        case "getVehicleByVehicleName":
            response = await vehicleController.getVehicleByVehicleName(req.body.vehicleName);
        break;
        case "getIdByVehicleName":
            response = await vehicleController.getIdByVehicleName(req.body.vehicleName);
        break;
        case "getVehicleById":
            response = await vehicleController.getVehicleById(req.body.id);
        break;
        case "deleteAllVehicles":
            response = await vehicleController.deleteAllVehicles();
        break;
        case "deleteVehicleByVehicleName":
            response = await vehicleController.deleteVehicleByVehicleName(req.body.vehicleName);
        break;
        case "deleteVehicleById":
            response = await vehicleController.deleteVehicleById(req.body.id);
        break;
        case "updateVehicleByVehicleName":
            response = await vehicleController.updateVehicleByVehicleName(
                req.body.vehicleName,
                req.body.updateVehicleData);
        break;
    }
    res.json(response);
}

router.get('/', httpRequestsHandler);

router.post('/', httpRequestsHandler);


module.exports = router;