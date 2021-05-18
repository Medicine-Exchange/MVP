window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
document.getElementById("get_otp").addEventListener("click",function() {
    var mobile_number = document.getElementById("mobile_number").value;
    if (!mobile_number) {
        alert("Enter a Valid Mobile Number");
        return false;
    }

    const phoneNumber = document.getElementById("mobile_number").value;
    
    var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      // confirmationResult can resolve with the fictional testVerificationCode above.
      window.confirmationResult = confirmationResult
      document.getElementById("confirm_otp").style = "visibility : visible;"
      document.getElementById("get_otp").style = "display: none;"
      document.getElementById("verification-code").style = "visibility: visible;"
      document.getElementById("recaptcha-container").style = "display;"
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
      alert("SMS not sent" + error)
    });
 //   );
})
document.getElementById("confirm_otp").addEventListener("click",function() {
    const otp = document.getElementById("verification_code").value;
    
    confirmationResult.confirm(otp).then(result => {
        const user = result.user;
       // app.post()
    })
    .catch((error) => {
        alert("Invalid otp entered")
    })
  })
document.getElementById("confirm_otp").addEventListener("click",function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      //alert("User signed in")
      window.location.href = "/userProfile"
    } else {
      alert("User not signed in")
      // No user is signed in.
    }
  });
})



