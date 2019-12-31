"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.post('/', function(req, res) {
    User.create(req.body)
        .then(user => res.send({student_id: req.body.student_id, success: 'true'}))
        .catch(err => res.status(400).send({student_id: req.body.student_id, success: 'false', err}));
});

module.exports = router;