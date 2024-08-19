const User = require(`../models/usersModel`);

// Function that is preventing duplicate users account
const validateEmail = (req, res) => {
  const { firstname, lastname, email, password, gender } = req.body;
  User.findOne({ email }).then((resp) => {
    if (resp) {
      res.json({
        status: 400,
        message: "email exist",
        success: false,
      });
    } else {
      res.json({
        status: 200,
        message: "success",
        success: true,
      });
    }
  });
};

// Function handling registration
const registerUsers = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.create({
    email,
    password,
  })
    .then((ret) => {
      console.log(ret);
      res.json({
        statuscode: 200,
        success: true,
        data: ret,
      });
    })
    .catch((err) => {
      res.json({
        status: err,
        success: false,
      });
      console.log(err);
    });
};

// Function handling login
const loginUsers = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((resp) => {
      if (resp) {
        bcrypt.compare(password, resp.password).then((ress) => {
          if (ress) {
            res.json({
              status: 200,
              success: true,
              message: "login successful",
              data: resp._id,
            });
          } else {
            res.json({
              status: 400,
              success: false,
              message: "Password is incorrect",
            });
          }
          console.log(ress);
        });
      } else {
        res.json({
          status: 401,
          success: false,
          message: "Account does not exist",
        });
      }
    });
};

// function handling current users data
const userData = (req, res) =>{
    const {id} = req.body;
    User.findOne(id).then((resp) =>{
          console.log(resp);
          res.json(resp)
    }).catch((error) => {
          res.json({
                status: 404,
                success: false,
                message: error
          })
    })
}


module.exports = {registerUsers, loginUsers, userData, validateEmail}