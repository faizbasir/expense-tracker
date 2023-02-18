const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const { check } = require("express-validator");
const authCheck = require("../middleware/auth-middleware");

router.post(
  "/signup",
  [
    check("name").notEmpty().withMessage({ msg: "Name cannot be empty" }),
    check("email").isEmail().withMessage({ msg: "Enter valid email" }),
    check("password")
      .isLength({ min: 5, max: 12 })
      .withMessage({ msg: "password has to be between 5 and 12 char" }),
  ],
  userController.createNewUser
);

router.post("/login", userController.login);

router.use(authCheck);

router.get("/all-users", userController.getAllUsers);

router.patch(
  "/:userId",
  [
    check("name").notEmpty().withMessage({ msg: "Name cannot be empty" }),
    check("email").isEmail().withMessage({ msg: "Enter valid email" }),
    check("password")
      .isLength({ min: 5, max: 12 })
      .withMessage({ msg: "password has to be between 5 and 12 char" }),
  ],
  userController.updateUserInfo
);

router.delete("/:userId", userController.deleteUserByUserId);

module.exports = router;
