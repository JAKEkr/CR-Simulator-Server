"use strict";

const fs = require('fs');
const xlsx = require('xlsx');
const Lecture = require('../models/lecture');

const resDir = './res/';

function parse(dirPath) {
    Lecture.collection.drop();
    fs.readdir(dirPath, (err, files) => {
        files.forEach(file => {
            const workbook = xlsx.readFile(resDir + file);
            const timetable = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            timetable.forEach(async lecture => {
                await Lecture.create({
                    no: lecture['NO'],
                    openUniv: lecture['개설대학'],
                    major: lecture['개설학과전공'],
                    courseNum: lecture['학수번호'],
                    classNum: lecture['분반'],
                    className: lecture['교과목명'],
                    completion: lecture['이수구분'],
                    grade: lecture['학년'],
                    score: lecture['학점'],
                    time: lecture['요일 및 강의시간'],
                    classRoom: lecture['강의실'],
                    professor: lecture['교수명'],
                    nCount: 0
                });
            });
        });
    });
}

module.exports.parse = parse;