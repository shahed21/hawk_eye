const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const MissionWayPointSchema = mongoose.Schema({
    missionWayPointName: {
        type: String,
        required: true
    },
    wayPointType: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    dimension: {
        type: Number,
        required: false
    },
    heading: {
        type: Number,
        required: false
    }
});

MissionWayPointSchema.plugin(uniqueValidator);

module.exports = mongoose.model('MissionWayPoint', MissionWayPointSchema);