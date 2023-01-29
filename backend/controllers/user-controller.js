const httpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/users");
const Expense = require("../models/expenses");

// go through user model for registration
// encryption for password

// Only for admin users
const getAllUsers = async (req, res, next) => {
  // add in user role check after adding in authentication
  try {
    const users = await User.find({}, "-password");
    res
      .status(200)
      .json({ Users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }
};

// login
const login = async (req, res, next) => {
  const { name, password } = req.body;

  let loadedUser;
  try {
    loadedUser = await User.findOne({ name });
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  if (loadedUser) {
    if (loadedUser.password === password) {
      res.status(200).json({
        user: loadedUser.toObject({ getters: true }),
        status: "logged in",
      });
    } else {
      return next(
        new httpError(
          "invalid password. please enter the correct password",
          401
        )
      );
    }
  } else {
    return next(
      new httpError("Invalid name. please check it is a valid name", 401)
    );
  }
};

// registration
const createNewUser = async (req, res, next) => {
  // Input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(new httpError("Input data error", 404));
  }

  const { name, email, password } = req.body;

  // check for existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  if (existingUser) {
    return next(new httpError("email already exists", 422));
  }

  // create new user object
  const user = new User({
    name,
    email,
    password,
    expenses: [],
    role: "user",
  });

  // save new user to db
  try {
    await user.save();
    res.status(200).json({ "New User": user.toObject({ getters: true }) });
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }
};

// edit user info
const updateUserInfo = async (req, res, next) => {
  // input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(new httpError("input validation error", 422));
  }

  const userId = req.params.userId;
  const { name, email, password } = req.body;

  // fetching user details from db
  let loadedUser;
  try {
    loadedUser = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 422));
  }

  // replacing old value with new values
  loadedUser.name = name;
  loadedUser.email = email;
  loadedUser.password = password;

  // save new details to db
  try {
    await loadedUser.save();
    res.status(200).json({ "Updated User": loadedUser });
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to update user", 500));
  }
};

// delete user from application
const deleteUserByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  // fetch user from db
  let loadedUser;
  try {
    loadedUser = await User.findById(userId).populate("expenses");
  } catch (error) {
    console.log(error);
    return next(new httpError("not able to fetch data", 500));
  }

  // check if user exists
  if (!loadedUser) {
    return next(new httpError(`user with id = ${userId} does not exist`, 404));
  }

  console.log(loadedUser);

  // Delete user from db
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await loadedUser.remove({ session });
    await Expense.deleteMany({ creator: userId });
    await session.commitTransaction();
    res.status(200).json({ "Deleted User": loadedUser });
  } catch (error) {
    console.log(error);
    return next(new httpError("Not able to delete user", 500));
  }
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.login = login;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserByUserId = deleteUserByUserId;
