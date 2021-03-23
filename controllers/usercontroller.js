const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");

router.post('/signup', (req, res) => {
  let userModel = {
    username: req.body.user.userName,
    newEmail: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 14),
  };

  User.create(userModel).then(user => {
      let token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.status(200).json({
        user: req.body.user.userName,
        message: 'USER SUCCESSFULLY INITIALIZED',
        sessionToken: token,

      });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: "NO INITIALIZATION TOOK PLACE"
      });
    });
});

// SIGNING IN A USER
router.post("/signin", function (req, res) {
  let email = req.body.user.username
  let password = req.body.user.password

  User.findOne({
    where: {
      username: email
    }
  }).then(user => {


    user ? comparePasswords(user) : res.send("User not found in our database")

    function comparePasswords(user) {
      bcrypt.compare(password, user.passwordhash, function (err, matches) {
        matches ? generateToken(user) : res.json({
          error: "Incorrect Password"
        })
      })
    }

    function generateToken(user) {

      var token = jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 240
      });
      res.json({
        user: user,
        message: "signed in",
        sessionToken: token
      });

    }

  })

})

module.exports = router;