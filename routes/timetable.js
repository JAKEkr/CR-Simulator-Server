"use strict";

const router = require('express').Router();
const Lecture = require('../models/lecture');

router.post('/', function(req, res) {
    console.log(req.body);
    Lecture.find(req.body).sort('no').then(timetable => res.send(timetable));
});

module.exports = router;