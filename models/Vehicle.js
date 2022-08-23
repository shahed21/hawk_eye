const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const VehicleSchema = mongoose.Schema({
    vehicleName: {
        type: String,
        unique: true,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    modelPath: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    scale: {
        type: Number,
        required: true
    },
    pilotId: {
        type: String,
        required: false
    },
    beingPiloted: {
        type: Boolean,
        required: true
    }
});

VehicleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Vehicle', VehicleSchema);