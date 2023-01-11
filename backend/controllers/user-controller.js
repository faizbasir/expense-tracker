const shortid = require("shortid");
const { get } = require("../routes/expenses-routes");
const httpError = require("../models/http-error");
const { validationResult } = require("express-validator");

// go through user model for registration
// encryption for password

DUMMY_USER = [
  {
    id: "2kmlkamsd1",
    name: "Faiz Basir",
    email: "faiz.basir23@gmail.com",
    password: "hell0there",
    role: "admin",
  },
];

const inputValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new httpError("Input data error", 404);
  }
};

const existingUser = (email) => {
  if (DUMMY_USER.find((user) => email === user.email)) {
    throw new httpError("Email already in use", 400);
  }
};

// Only for admin users
const getAllUsers = (req, res, next) => {
  if (DUMMY_USER.length === 0) {
    throw new httpError("no users found", 404);
  } else {
    res.status(200).json({ Users: DUMMY_USER });
  }
};

// login
const login = (req, res, next) => {
  const { email, password } = req.body;
  const loadedUser = DUMMY_USER.find((user) => {
    return email === user.email;
  });
  if (loadedUser) {
    if (loadedUser.password === password) {
      res.status(200).json({ user: loadedUser });
    } else {
      throw new httpError(
        "invalid password. please enter the correct password",
        401
      );
    }
  } else {
    throw new httpError("Invalid email. please check it is a valid email", 401);
  }
};

// registration
const createNewUser = (req, res, next) => {
  inputValidation(req);
  const { name, email, password } = req.body;
  existingUser(email);
  const user = {
    id: shortid.generate(),
    name,
    email,
    password,
    role: "user",
  };
  DUMMY_USER.push(user);
  res.status(200).json({ "user created": user });
};

// edit user info
const updateUserInfo = (req, res, next) => {
  inputValidation(req);
  const userId = req.params.userId;
  const { name, email, password } = req.body;
  const loadedUser = DUMMY_USER.find((user) => {
    return userId === user.id;
  });
  const userIndex = DUMMY_USER.indexOf(loadedUser);

  // replacing old value with new values
  loadedUser.name = name;
  loadedUser.email = email;
  loadedUser.password = password;

  // replace old item with new item in array
  DUMMY_USER[userIndex] = loadedUser;
  res.status(200).json({ "Updated User": loadedUser });
};

// delete user from application
const deleteUserByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const loadedUser = DUMMY_USER.find((user) => {
    return user.id === userId;
  });
  const userIndex = DUMMY_USER.indexOf(loadedUser);
  DUMMY_USER.splice(userIndex, 1);
  res.status(200).json({ "Deleted User": loadedUser });
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.login = login;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserByUserId = deleteUserByUserId;
