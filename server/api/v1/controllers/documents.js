'use strict';
const path = require('path');
const mongoose = require('mongoose');
const Document = require('../models/documentModel');

exports.save = function(req, res) {
    let owner;
    if(req.decoded) {
        owner = req.decoded.username;
    } else {
        owner = null;
    }
    if(!req.body.id) {
        const document = new Document({
            content: req.body.content,
            owner: owner
        });
        document.save(function(err, doc) {
            if(err) throw err;
            res.json({
                status: 'success',
                data: {
                    _id: doc._id
                },
                message: "Successfully created the document."
            });
        });
    } else {
        Document.findOneAndUpdate(
            {
                _id: req.body.id
            }, 
            {
                $set: {
                    content: content,
                    updatedAt: Date.now()
                }
            }, {new: true}, function(err, doc) {
                if(err) throw err;
                console.log(doc);
            });
    }
    
}