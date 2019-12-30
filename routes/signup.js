"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.post('/', function(req, res) {
    console.log(req.body);
    User.create(req.body)
        .then(user => res.send(user))
        .catch(err => res.status(500).send(err));
});

module.exports = router;