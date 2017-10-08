'use strict';
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.authenticate = function(req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    User.getAuthenticated(user.username, user.password, function(err, user, reason) {
        if(err) throw err;
        if(user) {
            const token = jwt.sign({
                username: user.username,
                email: user.email
            }, req.app.get('superSecret'), {
                expiresIn: 60 * 60 * 24 * 2 // expires in 48 hours
            });
            res.json({
                status: 'success',
                data: {
                    token: "JWT " + token
                },
                message: "Successfully logged in."
            });
        }
        const reasons = User.failedLogin;
        switch(reason) {
            case reasons.NOT_FOUND :
            case reasons.PASSWORD_INCORRECT: {
                res.status(401).send({
                    status: 'error',
                    data: null,
                    message: "Username or password incorrect."
                });
                break;
            }
            case reasons.MAX_ATTEMPTS: {
                //TODO: SEND EMAIL TO USER!!!!!!!!!!!
                break;
            }
        }
    });
}