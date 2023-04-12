const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);
router.get("/:username/class-schedule", authController.protect, userController.getClassSchedule);
router.get("/:username", authController.protect, userController.getSingleUser);

router.patch(
  "/:username/transcript",
  authController.protect,
  authController.restrictTo("admin"),
  userController.approveTranscript
);

router.patch(
  "/role",
  authController.protect,
  //authController.restrictTo("admin"),
  userController.setRole
);

router.patch(
  "/transcript",
  authController.protect,
  authController.restrictTo("student"),
  userController.requestTranscript
);

router.patch("/", authController.protect, userController.updateUser);
module.exports = router;
