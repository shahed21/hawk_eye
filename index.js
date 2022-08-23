//Modules
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//Server Constants
const port = 3000;
const app = express();

//MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());

//Import Routes
const usersRoute = require('./routes/usersRoute');
const vehiclesRoute = require('./routes/vehiclesRoute');
const missionsRoute = require('./routes/missionsRoute');

//Routes

// ROUTES THAT NEED TO BE REMOVED
app.use('/users', usersRoute);
app.use('/vehicles', vehiclesRoute);
app.use('/missions', missionsRoute);


app.get("/", (req,res)=> {
    res.status(200).send("home!");
});


//Connect to DB
mongoose
    .connect(process.env.mongodb_server, {
        useNewUrlParser: true//,
        // useUnifiedTopology: true
    })   
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

//     {userNewUrlParser: true},
//     ()=> {
//     console.log(`Connected to DB.`);
// })

//LISTENER
app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
});