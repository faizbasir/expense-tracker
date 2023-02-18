const httpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/users");
const Expense = require("../models/expenses");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/expenses");

// Only for admin users
const getAllUsers = async (req, res, next) => {
  // add in user role check after adding in authentication
  try {
    const users = await User.find({}, "-password");
    res
      .status(200)
      .json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(
      new httpError("Not able to fetch data @ user-controller.js:20", 500)
    );
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
  }

  let isValidPassword = false;

  if (!loadedUser) {
    return next(new httpError("User not found", 403));
  } else {
    try {
      isValidPassword = await bcrypt.compare(password, loadedUser.password);
    } catch (error) {
      return next(
        new httpError(
          "Could not log in due to technical error @ user-controller.js:47",
          500
        )
      );
    }
  }

  let token;

  if (isValidPassword) {
    try {
      token = jwt.sign(
        { userId: loadedUser.id, email: loadedUser.email },
        "secretKey",
        { expiresIn: "2h" }
      );
    } catch (error) {
      return next(
        new httpError(
          "Could not log in due to technical error @ user-controller.js:65",
          500
        )
      );
    }
    res.status(200).json({
      user: loadedUser.toObject({ getters: true }),
      token,
    });
  } else {
    return next(new httpError("Wrong password. Please try again", 401));
  }
};

// registration
const createNewUser = async (req, res, next) => {
  // Input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(new httpError("Input data error @ user-controller.js:85", 422));
  }

  const { name, email, password } = req.body;

  // check for existing email
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Not able to fetch data @ user-controller.js:97", 500)
    );
  }

  // check for existing name
  if (!existingUser) {
    try {
      existingUser = await User.findOne({ name });
    } catch (error) {
      console.log(error);
      return next(
        new httpError("Not able to fetch data @ user-controller.js:108", 500)
      );
    }
  }

  if (existingUser) {
    return next(new httpError("Name and/or Email already exists", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
    return next(
      new httpError(
        "Not able to create new user due to technical error @ user-controller.js:124",
        500
      )
    );
  }

  // create new user object
  const user = new User({
    name,
    email,
    password: hashedPassword,
    expenses: [],
    role: "user",
  });

  // save new user to db
  try {
    await user.save();
  } catch (error) {
    return next(
      new httpError("not able to fetch data @ user-controller.js:145", 500)
    );
  }

  let token;
  let loadedUser;

  //fetch new user from db and login
  try {
    loadedUser = await User.findOne({ name });
    token = jwt.sign(
      { userId: loadedUser.id, email: loadedUser.email },
      "secretKey",
      {
        expiresIn: "2h",
      }
    );
  } catch (error) {
    return next(
      new httpError("Not able to fetch data @ user-controller.js:163", 500)
    );
  }
  res.status(200).json({ user: loadedUser.toObject({ getters: true }), token });
};

// edit user info
const updateUserInfo = async (req, res, next) => {
  // input validation step
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.errors);
    return next(
      new httpError("Input validation error @ user-controller.js:176", 422)
    );
  }

  const userId = req.params.userId;
  const { name, email, password } = req.body;

  // fetching user details from db
  let loadedUser;
  try {
    loadedUser = await User.findById(userId);
  } catch (error) {
    console.log(error);
    return next(
      new httpError("Not able to fetch data @ user-controller.js:190", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = bcrypt.hash(password, 12);
  } catch (error) {
    return next(
      new httpError(
        "Unable to update details due to technical error @ user-controller.js:201",
        500
      )
    );
  }

  // replacing old value with new values
  loadedUser.name = name;
  loadedUser.email = email;
  loadedUser.password = hashedPassword;

  // save new details to db
  try {
    await loadedUser.save();
    res.status(200).json({ user: loadedUser });
  } catch (error) {
    return next(
      new httpError(
        "Not able to update details due to technical error @ user-controller.js:218",
        500
      )
    );
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
    return next(
      new httpError("Not able to fetch data @ user-controller.js:235", 500)
    );
  }

  // check if user exists
  if (!loadedUser) {
    return next(new httpError(`user with id = ${userId} does not exist`, 404));
  }

  console.log(loadedUser);

  // Delete user and related expenses from db
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await loadedUser.remove({ session });
    await Expense.deleteMany({ creator: userId });
    await session.commitTransaction();
    res.status(200).json({ "Deleted User": loadedUser });
  } catch (error) {
    return next(
      new httpError(
        "Not able to delete user due to techical error @ user-controller.js:257",
        500
      )
    );
  }
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.login = login;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserByUserId = deleteUserByUserId;
