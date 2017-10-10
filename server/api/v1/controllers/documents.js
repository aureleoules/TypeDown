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
        if(req.body.content.length > 5 && req.body.title.length > 3) {
            const document = new Document({
                content: req.body.content,
                title: req.body.title,
                tags: req.body.tags,
                owner: owner
            });
            document.save(function(err, doc) {
                if(err) throw err;
                res.json({
                    status: 'success',
                    _id: doc._id,
                    message: "Successfully created the document."
                });
            });
        } else {
            res.status(422).send({
                success: false,
                message: "Please enter at least 5 characters and a title."
            });
        }
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

exports.get = function(req, res) {
    const id = req.params.id;
    Document.findById(id, (err, document) => {
        if(err) throw err;
        res.json({document})
    });
}