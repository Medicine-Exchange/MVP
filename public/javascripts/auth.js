const confirmOTPButton = document.getElementById("confirm_otp");
const getOTPButton = document.getElementById("get_otp");
const verificationCode = document.getElementById("verification_code");
const verificationCodeContainer = document.getElementById("verification-code");
const recaptchaContainer = document.getElementById("recaptcha-container");
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

getOTPButton.addEventListener("click", function () {
  const phoneNumber = document.getElementById("mobile_number").value;
  if (!phoneNumber) {
    alert("Enter a Valid Phone Number");
    window.location.reload()
  } else {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    getOTPButton.style.display = "none";
    firebase.auth().signInWithPhoneNumber('+91' + phoneNumber, appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult
      recaptchaContainer.style.display = "none";
      verificationCodeContainer.style.display = "block";
      confirmOTPButton.style.display = "block";
    }).catch(function (error) {
      alert("Enter a valid 10 digit phone Number")
      console.log(error)
      //  window.location.reload()
    });
  }
});

//after login
confirmOTPButton.addEventListener("click", function () {
  const otp = verificationCode.value;

  confirmationResult.confirm(otp).then(result => {
    const user = result.user;
    // console.log(user)
    localStorage.setItem("userId", user.uid);
    localStorage.setItem("mobileNumber", user.phoneNumber);
    // console.log(user.phoneNumber);
    window.location.href = "/userProfile"
  })
    .catch((error) => {
      alert("Invalid OTP entered")
    })
});


