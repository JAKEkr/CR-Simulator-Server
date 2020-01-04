"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.put('/', function(req, res) {
    (async() => {
        try {
            await User.findOne({student_id: {$ne: req.body.student_id}, phone: req.body.phone})
                .then(user => {if(user) throw {type: 'phone', message: 'Duplicate phone number.'}})
                .catch(error => res.send({success: 'false', message: 'phone', error}));
            await User.findOne({student_id: {$ne: req.body.student_id}, email: req.body.email})
                .then(user => {if(user) throw {type: 'email', message: 'Duplicate email address.'}})
                .catch(error => res.send({success: 'false', message: 'email', error}));
            await User.deleteOne({student_id: req.body.student_id})
                .then(result => {
                    if(result.deletedCount > 0) {
                        User.create(req.body)
                            .then(user => res.send({success: 'true', user}));
                    } else throw {message: 'Cannot find user.'};
                })
        } catch (error) {
            res.send({success: 'false', error});
        }
    })();
});

router.get('/:student_id', function(req, res) {
    User.findOne({student_id: req.params.student_id})
        .then(user => {
            if(user)
                res.send({success: 'true', user});
            else throw {message:'Cannot find student ID.'};
        })
        .catch(error => res.send({success: 'false', error}));
});

router.post('/find/email', function (req, res) {
    console.log(req.body);
    User.findOne({name: req.body.name, email: req.body.email})
        .then(user => {
            if(user)
                res.send({success: 'true', user});
            else throw {message:'Cannot find student.'};
        })
        .catch(error => res.send({success: 'false', error}));
});

router.post('/find/email', function (req, res) {
    User.findOne({name: req.body.name, phone: req.body.email})
        .then(user => {
            if(user)
                res.send({success: 'true', user});
            else throw {message:'Cannot find student.'};
        })
        .catch(error => res.send({success: 'false', error}));
});

module.exports = router;