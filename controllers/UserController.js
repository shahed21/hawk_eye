const User = require('../models/User');

async function addNewUser(newUser) {
    console.log(`addNewUser`);
    console.log(newUser);
    var response;
    const user = new User({
        userName: newUser.userName,
        hash: newUser.hash,
        salt: newUser.salt,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email
    });

    let i=0;
    newUser.canPilotVehiclesOfTypes.forEach(canPilotVehiclesOfType => {
        user.canPilotVehiclesOfTypes.set(i, canPilotVehiclesOfType);
        i++;
    });

    user.authorizedAs.developer = newUser.authorizedAs.developer;
    user.authorizedAs.systemAdmin = newUser.authorizedAs.systemAdmin;
    user.authorizedAs.missionAdmin = newUser.authorizedAs.missionAdmin;
    user.authorizedAs.pilot = newUser.authorizedAs.pilot;
    user.authorizedAs.viewer = newUser.authorizedAs.viewer;

    try {
        const savedUser = await user.save();
        response = {
            success: true,
            data: savedUser
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
}

async function getAllUsers() {
    console.log(`getAllUsers`);
    var response;
    try{
        const users = await User.find();
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getUserByUserName(userName) {
    console.log(`getUserByUserName`);
    var response;
    try{
        const users = await User.findOne({userName: userName});
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function getIdByUserName(userName) {
    console.log(`getIdByUserName`);
    var response;
    try{
        const users = await User.findOne({userName: userName});
        response = {
            success: true,
            data: users._id
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};


async function getUserById(id) {
    console.log(`getUserById`);
    var response;
    try{
        const users = await User.findOne({_id: id});
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteAllUsers() {
    console.log(`deleteAllUsers`);
    var response;
    try{
        const users = await User.deleteMany();
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteUserByUserName(userName) {
    console.log(`deleteUserByUserName`);
    var response;
    try{
        const users = await User.deleteOne({userName: userName});
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function deleteUserById(id) {
    console.log(`deleteUserById`);
    var response;
    try{
        const users = await User.deleteOne({_id: id});
        response = {
            success: true,
            data: users
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
};

async function updateUserByUserName(userName, updateUserData) {
    console.log(`updateUserByUserName`);
    console.log(updateUserData);
    console.log({userName: userName});
    var response;
    // const user = new User();

    try {
        const savedUser = await User.updateOne(
                {userName: userName},
                {$set: updateUserData}
            );
        response = {
            success: true,
            data: savedUser
        };
    } catch (err) {
        response = {success: false, message: `${err}`};
    }
    return response;
}


module.exports = {
    addNewUser,
    getAllUsers,
    getUserByUserName,
    getIdByUserName,
    getUserById,
    deleteAllUsers,
    deleteUserByUserName,
    deleteUserById,
    updateUserByUserName
};