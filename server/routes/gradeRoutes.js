const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const authController = require("../controllers/authController");

router.post(
  "/:class_id",
  authController.protect,
  authController.restrictTo("professor"),
  gradeController.submitGrade
);
router.patch(
  "/approve/:id",
  authController.protect,
  authController.restrictTo("professor"),
  gradeController.updateGrade
);

module.exports = router;
