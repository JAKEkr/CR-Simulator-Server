"use strict";

const mongoose = require('mongoose');

// Define user schema
const RegSchema = new mongoose.Schema({
    student_id: {type: String, required: true, unique: true},
    timetable: [new mongoose.Schema({
        no: {type: Number, required: true},
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
        professor: {type: String, trim: true}
    })]
});

// Create new user document
RegSchema.statics.create = function(payload) {
    // this === Model
    const user = new this(payload);
    // return Promise
    return user.save();
};

// Create Model & Export
module.exports = mongoose.model('Reg', RegSchema);