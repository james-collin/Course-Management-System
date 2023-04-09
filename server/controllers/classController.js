"use strict";
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Class = require("../models/classModel");
const Grade = require("../models/gradeModel");
const Course = require("../models/courseModel");

exports.getClasses = catchAsync(async (req, res, next) => {
  const result = await Class.findAll({ include: [Course] });
  res.status(200).json({
    status: "success",
    result,
  });
});

exports.getClassesOfACourse = catchAsync(async (req, res, next) => {
  const result = await Class.findAll({
    where: { course_id: req.params.course_id },
  });
  res.status(200).json({
    status: "success",
    result,
  });
});

exports.getSingleClass = catchAsync(async (req, res, next) => {
  const result = await Class.findOne({
    where: { class_id: req.params.class_id },
    include: [Course, User],
  });
  if (result == null) return next(new AppError(`Class Does Not found`, 404));
  res.status(200).json({
    status: "success",
    result,
  });
});

exports.requestClassEnrolment = catchAsync(async (req, res, next) => {
  const student = req.user.username;
  const completed_courses = Grade.findAll({
    where: { username: student },
    fields: ["course_id"],
  });
  const result = await Class.findOne({
    where: { class_id: req.params.class_id },
    include: [Course],
  });
  const prerequisites = result.course.prerequisites;
  // add to pending array
  res.status(200).json({ completed_courses, prerequisites });
});

exports.createClass = catchAsync(async (req, res, next) => {
  const professor = await User.findOne({
    where: { role: "professor", username: req.body.professor },
  });
  if (!professor)
    return next(
      new AppError(`Professor ${req.body.professor} doesn't exist`, 405)
    );
  const course = await Class.create(req.body);
  res.status(200).json(course);
});

exports.updateClass = catchAsync(async (req, res, next) => {
  let _class = await Class.findOne({
    where: { class_id: req.params.class_id },
  });
  if (_class == null) return next(new AppError(`Class Does Not found`, 404));
  const professor = await User.findOne({
    where: { role: "professor", username: req.body.professor },
  });
  if (!professor)
    return next(
      new AppError(`Professor ${req.body.professor} doesn't exist`, 405)
    );
  _class = await Class.update(req.body, {
    returning: true,
    where: { class_id: req.params.class_id },
  });
  res.status(200).json({
    message: "Successfully updated",
    class: _class[1][0],
  });
});

exports.approveClassEnrolment = catchAsync(async (req, res, next) => {});
