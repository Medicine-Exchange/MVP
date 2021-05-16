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
// /* Process the login form */
router.post('/login', function (req, res) {
	//Please add next page i.e navigation bar here
	res.render('signup', {title})
});

/* Get Signup page*/
router.get('/signup', function (req, res) {
  res.render('signup', { title })
});

/* Get Signup page*/
router.post('/signup', function (req, res) {
	console.log("xyz");
  //res.render('signup', { title })
});

/* Get Profile Page */
router.get('/profile', function(req, res) {
    res.render('profile.ejs', {
        user : 'xyz'
    });
});

// // LOGOUT ==============================
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
