window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
document.getElementById("get_otp").addEventListener("click",function() {
    
    const phoneNumber = document.getElementById("mobile_number").value;
    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // confirmationResult can resolve with the fictional testVerificationCode above.
      window.confirmationResult = confirmationResult
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
      alert("SMS not sent")
    });
 //   );
})
var express = require('express');
var router = express.Router();
var app = express();
var indexRouter = require('./routes/signup');
document.getElementById("confirm_otp").addEventListener("click",function() {
    const otp = document.getElementById("verification_code").value;
    confirmationResult.confirm(otp).then(result => {
        const user = result.user;
        app.use(function(req, res, next) {
            next(createError(404));
          });
    }).catch((error) => {
        alert("Invalid otp entered")
    })
})


