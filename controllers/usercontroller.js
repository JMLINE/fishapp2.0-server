const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



router.post('/createuser', function (req, res) {
  User.create({
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 13),
      newEmail: req.body.user.newEmail
    })
    .then(
      function createSuccess(user) {
        let token = jwt.sign({
          id: user.id
        }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({
          user: user,
          message: 'Time to Save the World!',
          token: token
        });
      }
    )
    .catch(err => res.status(500).json({
      error: err
    }))
});







// router.post("/createuser", function (req, res) {
//   //   var userName = "fake@fake.com";
//   //   var password = "ThisIsAPassword";

//   var userName = req.body.user.username;
//   var password = req.body.user.password;
//   var newEmail = req.body.user.newEmail;

//   User.create({
//     username: userName,
//     passwordhash: bcrypt.hashSync(password, 10),
//     newEmail: newEmail
//   }).then(
//     function createSuccess(user) {
//       var token = jwt.sign({
//         id: user.id
//       }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24
//       });
//       res.json({
//         user: user,
//         message: "created",
//         sessionToken: token
//       });
//     },
//     function createError(err) {
//       res.send(500, err.message);
//     }

//   );
// });

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