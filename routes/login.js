"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.post('/', function(req, res) {
    const id = req.body.student_id;
    User.findOne({student_id: id})
        .then(user => {
            if(user) {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch)
                            res.send({success: 'true', student_id: id});
                        else
                            res.send({success: 'false', student_id: id})
                    })
            } else {
                throw {message: 'Wrong student ID.'};
            }
        })
        .catch(error => res.send({success: 'false', student_id: id, error}));
});

module.exports = router;