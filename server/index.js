const express = require('express');
const router = express.Router();
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

mongoose.connect(config.database).then(() => {
    console.log("Successfully connected to MongoDB.");
});

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    let token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];
    if(token) {
        token = token.split(" ")[1];
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded; 
                next(); 
            }
        });
    } else {
        next();
    }
});

//Loop through every routes in ./api/v1/routes
fs.readdirSync(__dirname + "/api/v1/routes/").forEach(function(file) {
    if (file == "index.js") return;
    var name = file.substr(0, file.indexOf('.'));

    //Use the v1
    app.use('/api/v1/' + name, require('./api/v1/routes/' + name).router);

});
// const api = require('./api/v1/routes/').router;
// app.use('/api/v1/', api);

app.listen(port, () => console.log("Listening at http://localhost:" + port));