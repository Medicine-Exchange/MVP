var express = require('express');
var router = express.Router();

// Define title of the website to be passed around pages
const title = 'Donate Medicine';

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

/* Request Medicine page*/
router.get('/request', function (req, res) {
  res.render('request', { title })
});

/* Get Profile Page */
router.get('/userProfile', function(req, res) {
    res.render('userProfile.ejs', { title });
});

/* Get About Us */
router.get('/aboutUs' , function(req,res){
  res.render('aboutUs', {title})
});

/* Get Privacy Policy */
router.get('/privacyPolicy' , function(req,res){
  res.render('privacyPolicy', {title})
});

/* Get FAQ */
router.get('/FAQ' , function(req,res){
  res.render('FAQ', {title})
});

/* Get disclaimer */
router.get('/disclaimer' , function(req,res){
  res.render('disclaimer', {title})
});

/* Get Donor Policy*/
router.get('/donorPolicy' , function(req,res){
  res.render('donorPolicy', {title})
});

/* Verify OTP */
// router.post('/otp' , function(req,res){
//   res.render('verifyotp' , {title})
// });



// // LOGOUT ==============================
// router.get('/logout', function(req, res) {
//     req.logout();
//     res.redirect('/');
// });

module.exports = router;
