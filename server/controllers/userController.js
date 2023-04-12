"use strict";
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const Class = require("../models/classModel");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const jwtGenerator = require("../utils/jwtGenerator");
const Course = require("../models/courseModel");

const createSendToken = (req, res, user, message) => {
  const jwtToken = jwtGenerator(
    { username: user.username },
    process.env.jwtSessionTokenExpire
  );

  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000
    ),
    httpOnly: true,
    //secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  if (process.env.NODE_ENV === "prooooductin") cookieOptions.secure = true;
  user.password = undefined;
  //console.log(user);
  user = user.dataValues;
  res.status(200).json({
    status: "success",
    message,
    user,
  });
};

exports.signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username,
    },
  });
  //console.log(user.user.dataValues);
  if (user == null) return next(new AppError("Invalid Credential", 404));
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return next(new AppError("Invalid Credential", 404));
  createSendToken(req, res, user, "Successfully Logged In!");
});

exports.logOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  console.log("loginng out...");
  res.status(200).json({ status: "success" });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const Op = Sequelize.Op;
  const { email, username, first_name, last_name, password } = req.body;
  console.log(email, username);
  let user = await User.findOne({
    where: { email },
  });
  if (user) return next(new AppError("Email is already used!", 405));
  user = await User.findOne({
    where: { username },
  });
  if (user) return next(new AppError("Username Already Exist!", 405));

  const salt = await bcrypt.genSalt(10);
  const encrypted_password = await bcrypt.hash(password, salt);
  user = await User.create({
    username,
    first_name,
    last_name,
    email,
    password: encrypted_password,
  });
  user.password = undefined;

  res.status(201).json({
    status: "success",
    user,
  });
});

exports.getSingleUser = catchAsync(async (req, res, next) => {
  const username = req.params.username || req.user.username;
  const user = await User.findOne({
    where: {
      username,
    },
    include: [Class],
  });
  if (user == null)
    return next(
      new AppError(`User with Username : ${username} not found!`, 404)
    );
  user.password = undefined;
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const username = req.user.username;
  const allowedFields = ["first_name", "last_name", "description"];
  const user = await User.update(req.body, {
    where: { username },
    fields: allowedFields,
    returning: true,
  });
  res.status(200).json({
    status: "success",
    user: user[1][0],
  });
});

exports.setRole = catchAsync(async (req, res, next) => {
  const { role, username } = req.body;
  let user = await User.findOne({
    where: {
      username,
    },
  });
  if (user == null) return next(new AppError(`User does not exist`, 404));
  user = await User.update(
    { role },
    {
      where: { username },
      returning: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: `User has been made ${role}`,
  });
});

exports.requestTranscript = catchAsync(async (req, res, next) => {
  const username = req.user.username;
  const user = await User.update(
    { isTranscriptPending: true },
    {
      where: { username },
      returning: true,
    }
  );
  res.status(200).json({
    status: "success",
  });
});

exports.approveTranscript = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.update(
    { isTranscriptPending: false },
    {
      where: { username },
      returning: true,
    }
  );
  res.status(200).json({
    status: "success",
  });
});

exports.getClassSchedule = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findAll({
    where: { username },
    returning: true,
    attributes: [],
    include: [
      {
        model: Class,
        attributes: ["schedules"], 
      },
    ],
  });
  res.status(200).json({
    user,
    status: "success",
  });
});