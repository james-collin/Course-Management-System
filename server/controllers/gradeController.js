const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Grade = require("../models/gradeModel");
const Class = require("../models/classModel");
const { Op } = require("sequelize");

exports.submitGrade = catchAsync(async (req, res, next) => {
  // class id, username, grade, credit
  // initially while enrolling in class
  const result = await Grade.create(req.body);
  res.status(200).json(result);
});

exports.getGrades = catchAsync(async (req, res, next) => {
  let result;
  if (!isNaN(req.params.id)) {
    console.log(req.params.id);
    result = await Grade.findAll({
      where: { class_id: req.params.id },
    });
  } else {
    // grades of a student
    result = await Grade.findAll({
      where: { username: req.params.id, grade: { [Op.not]: null } },
      include: {
        model :Class,
        attributes : ["class_id","course_id","teacher"]
      },
    });
  }
  res.status(200).json(result);
});

exports.updateGrade = catchAsync(async (req, res, next) => {
  const gradings = req.body;
  const promises = gradings.map((temp) => {
    return Grade.update(
      { grade: temp.grade, credit: temp.credit },
      { where: { class_id: temp.class_id, username: temp.username } }
    );
  });

  const result = await Promise.all(promises);
  res.status(200).json();
});
