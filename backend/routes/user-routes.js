const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/all-users", userController.getAllUsers);
router.post("/login", userController.createNewUser);
router.get("/login", userController.getUserByUsername);
router.patch("/:userId", userController.updateUserInfo);
router.delete("/:userId", userController.deleteUserByUserId);

module.exports = router;
