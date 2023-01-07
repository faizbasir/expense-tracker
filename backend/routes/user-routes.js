const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const { check } = require("express-validator");

router.get("/all-users", userController.getAllUsers);
router.post(
  "/login",
  [
    check("name").notEmpty().withMessage("Summary cannot be empty"),
    check("email").isEmail().normalizeEmail().withMessage("Enter valid email"),
    check("password")
      .isLength({ min: 5, max: 12 })
      .withMessage("password has to be between 5 and 12 char"),
  ],
  userController.createNewUser
);
router.get("/login", userController.login);
router.patch(
  "/:userId",
  [
    check("name").notEmpty().withMessage("Summary cannot be empty"),
    check("email").normalizeEmail().withMessage("Enter valid email"),
    check("password")
      .isLength({ min: 5, max: 12 })
      .withMessage("password has to be between 5 and 12 char"),
  ],
  userController.updateUserInfo
);
router.delete("/:userId", userController.deleteUserByUserId);

module.exports = router;
