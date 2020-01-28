"use strict";

const router = require('express').Router();
const User = require('../models/user');
const Reg = require('../models/reg');

router.post('/', function(req, res) {
    User.create(req.body)
        .then(user => {
            Reg.create({student_id: req.body.student_id});
            res.send({success: 'true', user})
        })
        .catch(error => res.send({success: 'false', error}));
});

router.get('/:student_id', function(req, res) {
    const id = req.params.student_id;
    User.findOne({student_id: id})
        .then(user => {
            if(user)
                res.send({success: 'false', student_id: id});
            else
                res.send({success: 'true', student_id: id});
        })
        .catch(error => res.send({success: 'false', error}));
});

module.exports = router;