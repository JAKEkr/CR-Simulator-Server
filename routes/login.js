"use strict";

const router = require('express').Router();
const User = require('../models/user');

router.post('/', function(req, res) {
    User.findOne({student_id: req.body.student_id})
        .then(user => {

        })
        .catch(error)


    {
        return new Promise(function (resolve, reject) {
            if(!user || err)
                reject({student_id: req.body.student_id, success: 'false'});

            user.comparePassword(req.body.password, function (err, isMatch) {
                if(!isMatch || err)
                    reject({student_id: req.body.student_id, success: 'false'});
                else
                    resolve({student_id: req.body.student_id, success: 'true'});
            });
        }).then(msg => res.send(msg))
            .catch(err => res.send(err));
    });
});


// User.findOne({student_id: req.body.student_id}, function(err, user) {
//     return new Promise(function (resolve, reject) {
//         if(!user || err)
//             reject({student_id: req.body.student_id, success: 'false'});
//
//         user.comparePassword(req.body.password, function (err, isMatch) {
//             if(!isMatch || err)
//                 reject({student_id: req.body.student_id, success: 'false'});
//             else
//                 resolve({student_id: req.body.student_id, success: 'true'});
//         });
//     }).then(msg => res.send(msg))
//         .catch(err => res.send(err));
// });
module.exports = router;