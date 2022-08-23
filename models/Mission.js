const mongoose = require('mongoose');
const MissionWayPoint = require('./MissionWayPoint');
const uniqueValidator = require('mongoose-unique-validator');

const MissionSchema = mongoose.Schema({
    missionName: {
        type: String,
        required: true
    },
    missionAdminId: {
        type: String,
        required: true
    },
    vehicles: [{
        vehicleId: String, 
        pilotId: String, 
        wayPoints: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MissionWayPoint'
        }]
    }],
    viewerIdsAuthorized: [String]
});

MissionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Mission', MissionSchema);