'use strict';
const path = require('path');
const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.create = function(req, res) {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err) {
        if(err) throw err;
        res.json({
            status: 'success',
            data: null,
            message: "Successfully registered user."
        });
    });
}