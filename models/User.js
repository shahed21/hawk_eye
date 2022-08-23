const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    // id: {
    //     type: String,
    //     required: false
    // },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    canPilotVehiclesOfTypes: [String],
    authorizedAs: {
        developer: Boolean,
        systemAdmin: Boolean,
        missionAdmin: Boolean,
        pilot: Boolean,
        viewer: Boolean
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);