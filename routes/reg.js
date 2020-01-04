"use strict";

const router = require('express').Router();
const Lecture = require('../models/lecture');
const Reg = require('../models/reg');

router.get('/:student_id', function(req, res) {
    Reg.findOne({student_id: req.params.student_id})
        .then(reg => {res.send({success: 'true', reg})});
});

router.put('/', function(req, res) {
    Reg.findOne({student_id: req.body.student_id}, (error, reg) => {
        Lecture.findOne({
            major: req.body.major,
            courseNum: req.body.courseNum,
            classNum: req.body.classNum
        }).then(result => {
            if(reg.timetable) {
                reg.timetable.push(result);
                reg.save();
                res.send({success: 'true', reg})
            } else {
                Reg.create({
                    student_id: req.body.student_id,
                    timetable: result
                }).then(reg => {
                    res.send({success: 'true', reg})
                }).catch(error => res.send({success: 'false', error}));
            }
            result.nCount += 1;
            result.save();
        }).catch(error => {res.send({success: 'false', error})});
    });
});

router.delete('/', function(req, res) {
    Reg.updateOne({student_id: req.body.student_id}, {$pull: {timetable: {courseNum: req.body.courseNum}}})
        .then(reg => {
            Lecture.findOne({
                major: req.body.major,
                courseNum: req.body.courseNum,
                classNum: req.body.classNum
            }).then(result => {
                if (result.nCount > 0) {
                    result.nCount -= 1;
                    result.save();
                }
            });
            res.send({success: 'true', reg});
        });
});

module.exports = router;