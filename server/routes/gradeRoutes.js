const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const authController = require("../controllers/authController");

router.post(
  "/",
  authController.protect,
  // authController.restrictTo("teacher"),
  gradeController.submitGrade
);
router.patch(
  "/",
  authController.protect,
  //authController.restrictTo("teacher"),
  gradeController.updateGrade
);
router.get(
  "/:id",
  authController.protect,
  //authController.restrictTo("teacher"),
  gradeController.getGrades
);

module.exports = router;
