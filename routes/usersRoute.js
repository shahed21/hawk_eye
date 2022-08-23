const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

async function httpRequestsHandler(req, res) {
    console.log(`httpRequestsHandler`);
    console.log(req.body);
    var response;

    switch(req.body.method) {
        case "addNewUser":
            response = await userController.addNewUser(req.body.user);
        break;
        case "getAllUsers":
            response = await userController.getAllUsers();
        break;
        case "getUserByUserName":
            response = await userController.getUserByUserName(req.body.userName);
        break;
        case "getIdByUserName":
            response = await userController.getIdByUserName(req.body.userName);
        break;
        case "getUserById":
            response = await userController.getUserById(req.body.id);
        break;
        case "deleteAllUsers":
            response = await userController.deleteAllUsers();
        break;
        case "deleteUserByUserName":
            response = await userController.deleteUserByUserName(req.body.userName);
        break;
        case "deleteUserById":
            response = await userController.deleteUserById(req.body.id);
        break;
        case "updateUserByUserName":
            response = await userController.updateUserByUserName(
                req.body.userName,
                req.body.updateUserData);
        break;
    }
    res.json(response);
}

router.get('/', httpRequestsHandler);

router.post('/', httpRequestsHandler);


module.exports = router;