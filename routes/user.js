"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.put('/', function(req, res) {
    User.create(req.body)
        .then(user => res.send({student_id: req.body.student_id, success: 'true'}))
        .catch(err => res.send({student_id: req.body.student_id, success: 'false', err}));
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

router.get('/find/:name/:phone', function (req, res) {

});

module.exports = router;