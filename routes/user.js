"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.put('/', function(req, res) {
    (async() => {
        try {
            await User.findOne({student_id: {$ne: req.body.student_id}, phone: req.body.phone})
                .then(user => {if(user) throw {type: 'phone', message: 'Duplicate phone number.'}});
            await User.findOne({student_id: {$ne: req.body.student_id}, email: req.body.email})
                .then(user => {if(user) throw {type: 'email', message: 'Duplicate email address.'}});
            await User.deleteOne(req.body.student_id)
                    .then(result => {
                        if(result.deletedCount > 0) {
                            User.create(req.body)
                                .then(user => res.send({success: 'true', user}));
                        } else throw {message: 'Cannot find user.'};
                    });
        } catch (error) {
            res.send({success: 'false', error});
        }
    })();
});

router.get('/:student_id', function(req, res) {
    const id = req.params.student_id;
    User.findOne({student_id: id})
        .then(user => {
            if(user)
                res.send({success: 'true', user});
            else throw {message:'Cannot find student ID.'};
        })
        .catch(error => res.send({success: 'false', error}));
});

router.post('/find', function (req, res) {
    User.findOne({name: req.body.name, phone: req.body.phone})
        .then(user => {
            if(user)
                res.send({success: 'true', user});
            else throw {message:'Cannot find student.'};
        })
        .catch(error => res.send({success: 'false', error}));
});

module.exports = router;