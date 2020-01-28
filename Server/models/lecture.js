"use strict";

const mongoose = require('mongoose');

// Define user schema
const LectureSchema = new mongoose.Schema({
    no: {type: Number, required: true, unique: true},
    openUniv: {type: String, trim: true, required: true},
    major: {type: String, trim: true, required: true},
    courseNum: {type: String, trim: true, required: true},
    classNum: {type: String, trim: true, required: true},
    className: {type: String, trim: true, required: true},
    completion: {type: String, trim: true, required: true},
    grade: {type: String, trim: true, required: true},
    score: {type: String, trim: true, required: true},
    time: {type: String, trim: true},
    classRoom: {type: String, trim: true},
    professor: {type: String, trim: true},
    nCount: {type: Number}
});

// Create new user document
LectureSchema.statics.create = function(payload) {
    // this === Model
    let user = new this(payload);
    return user.save();
};

// Create Model & Export
module.exports = mongoose.model('Lecture', LectureSchema);