var express = require('express');
var router = express.Router();

// Define title of the website to be passed around pages
const title = 'Medicine Exchange';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title });
});

/* Get Login page */
router.get('/login', function (req, res) {
  res.render('login', { title })
});

/* Get Signup page*/
router.get('/signup', function (req, res) {
  res.render('signup', { title })
});

/* Donation page*/
router.get('/donate', function (req, res) {
  res.render('donate', { title })
});

/* Get Profile Page */
// router.get('/profile', isLoggedIn, function(req, res) {
//     res.render('profile.ejs', {
//         user : req.user
//     });
// });

// // LOGOUT ==============================
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
