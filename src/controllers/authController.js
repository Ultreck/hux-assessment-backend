const { response } = require("express");
const User = require(`../models/usersModel`);
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtils");

// Function that is authenticating users
const authenticateUsers = (email) => {
  return User.findOne({ email })
    .select("+password")
    .then((response) => {
      
      if (response === null) {
        return {
          status: 404,
          success: false,
          message: "User not found",
        };
      } else {
        return response;
      }
    });
};

// Function handling login
const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUsers(email);
  console.log(user);

  if (user) {
    bcrypt.compare(password, user.password).then((response) => {
      if(response){
        const token = generateToken({ id: user._id });
        res.json({ data: user, token, statuscode:200, message: "You are Successfully Logged in", isSuccess: true });
      }else{
        res.json({statuscode:400, message: "Incorrect password", isSuccess: false });
      }

      
    })
  } else {
    res.json({ message: "Invalid credentials" });
  }
};

// Function handling registration
const registerUsers = async (req, res) => {
  const { email, password, fullName } = req.body;
  User.findOne({ email }).then((resp) => {
    if (resp) {
      res.json({
        status: 409,
        message: "Account already exist. Please create another account",
        success: false,
      });
    } else {
      const newUser = new User({ email, password });
      newUser
        .save()
        .then((result) => {
          const token = generateToken({ id: result._id });
          res.status(201).json({ data: result, token,  message: "Account is successfully created",  isSuccess: true});
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  });
};

// function handling/getting current users information
const getUsers = (req, res) => {
  const { id } = req.body;
  User.findOne(id)
    .then((resp) => {
      res.json({ data: resp, statusCode: 200, isSuccess: true });
    })
    .catch((error) => {
      res.json({
        status: 404,
        success: false,
        message: error,
      });
    });
};

module.exports = { registerUsers, loginUsers, getUsers };
