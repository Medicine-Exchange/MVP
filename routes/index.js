var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Medicine Exchange' });
});

/* Get Login page */
router.get('/login', function(req, res) {
    res.render('login.ejs')
});

/* Get Signup page*/ 
router.get('/signup', function(req, res) {
    res.render('signup.ejs') 
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
