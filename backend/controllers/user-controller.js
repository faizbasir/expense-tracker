const shortid = require("shortid");
const { get } = require("../routes/expenses-routes");

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

// Only for admin users
const getAllUsers = (req, res, next) => {
  if (DUMMY_USER.length === 0) {
    res.status(200).json({ message: "No Users found" });
  } else {
    res.status(200).json({ Users: DUMMY_USER });
  }
};

// login
const getUserByUsername = (req, res, next) => {
  const { email, password } = req.body;
  const loadedUser = DUMMY_USER.find((user) => {
    return email === user.email;
  });
  if (loadedUser) {
    if (loadedUser.password === password) {
      res.status(200).json({ user: loadedUser, status: "valid" });
    } else {
      res.status(401).json({
        message: "invalid password. please enter the correct password",
        status: "invalid",
      });
    }
  } else {
    res
      .status(401)
      .json({ message: "Invalid email. please check it is a valid email" });
  }
};

// registration
const createNewUser = (req, res, next) => {
  const { name, email, password } = req.body;
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
  const userId = req.params.userId;
  const { name, email, password } = req.body;
};

// delete user from application
const deleteUserByUserId = (req, res, next) => {
  const userId = req.params.userId;
};

exports.getAllUsers = getAllUsers;
exports.createNewUser = createNewUser;
exports.getUserByUsername = getUserByUsername;
exports.updateUserInfo = updateUserInfo;
exports.deleteUserByUserId = deleteUserByUserId;
