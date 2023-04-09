const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const authController = require("../controllers/authController");

router.get("/", classController.getClasses);
router.get("/:class_id", classController.getSingleClass);
router.post(
  "/:class_id",
  authController.protect,
  authController.restrictTo("student"),
  classController.requestClassEnrolment
);

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  classController.createClass
);

router.patch(
  "/:class_id",
  authController.protect,
  authController.restrictTo("admin"),
  classController.updateClass
);

router.post(
  "/:class_id/:username",
  authController.protect,
  authController.restrictTo("professor"),
  classController.approveClassEnrolment
);

module.exports = router;
