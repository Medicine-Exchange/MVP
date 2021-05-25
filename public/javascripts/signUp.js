const currentUser = localStorage.getItem('userId');
const phoneNumber = localStorage.getItem('mobileNumber');
const username  = document.getElementById("name")
const email  = document.getElementById("email")
const phoneNumberProfile = document.getElementById("mobile_number_profile")
const submitProfileButton = document.getElementById("submit")
const profileMessage = document.getElementById("message")
var data = JSON.stringify({
  "userId": currentUser,
  "name": username.value,
  "phone": phoneNumber.value,
  "email": email.value,
  // "address": {
  //   "line1": "B/6",
  //   "line2": "Street",
  //   "line3": "Sector",
  //   "city": "Bokaro",
  //   "state": "Jharkhand"
  // },
  // "pinCode": "820002",
  // "townID": "TWN001",
  // "location": {
  //   "lat": "23.5323",
  //   "long": "32.77840"
  });

window.onload = function()
   {
       phoneNumberProfile.value = phoneNumber
       phoneNumberProfile.readOnly = true
       
      username.value = localStorage.getItem("username")
      email.value = localStorage.getItem("email")
       console.log(username.value)
       console.log(email.value)
       console.log(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`)
  
if(!username.value && !email.value)
{
fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    if (Object.keys(data).length) {
        console.log(Object.keys(data))
        console.log(data)
        //set
        username.value = data.Name
        email.value = data.Email

        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);

        console.log(localStorage.getItem("username"))
        console.log(localStorage.getItem("email"))

        submitProfileButton.style = "display:none"
        profileMessage.innerHTML = "Congrats profile completed, go to Donation page to make a donation!"
        profileMessage.style.color = "Blue"
        //  window.location.reload()
      //  return

    } else {
        console.log('No Data')
    }
}).catch((error) => {
    console.error('Error:', error);
});
}
else
{
  submitProfileButton.style = "display:none"
  profileMessage.innerHTML = "Congrats profile completed, go to Donation page to make a donation!"
  profileMessage.style.color = "Blue"
}

// fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
//     method: 'POST'
// }).then(response => response.json()).then(data => {
//     if (Object.keys(data).length) {
//         console.log(data);
//     } else {
//         console.log('No Data')
//     }
// }).catch((error) => {
//     console.error('Error:', error);
// });

submitProfileButton.addEventListener("click" , function(){

  
  
  var data = JSON.stringify({
    "userId": currentUser,
    "name": document.getElementById("name").value,
    "phone": phoneNumber.value,
    "email": document.getElementById("email").value
    // "address": {
    //   "line1": "B/6",
    //   "line2": "Street",
    //   "line3": "Sector",
    //   "city": "Bokaro",
    //   "state": "Jharkhand"
    // },
    // "pinCode": "820002",
    // "townID": "TWN001",
    // "location": {
    //   "lat": "23.5323",
    //   "long": "32.77840"
    });
    var requestOptions = {
      method: 'POST',
      // headers: myHeaders,
      body: data,
      // redirect: 'follow'
    };
  
    console.log(data)
  fetch("https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});
   };
// fetch('https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users', {
//   method: 'POST', // or 'PUT'
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
//   body: JSON.stringify(data),
// })
// .then(response => {
//     console.log('Response:', response.json());
// })
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });
// });
// function encodeImageFileAsURL(fileElement) {
//     const file = fileElement.files[0];
//     const fileReader = new FileReader();
//     fileReader.onloadend = (event) => {
//         avatarImageElement.style.backgroundImage = `url('${fileReader.result}')`;
//         localStorage.setItem("encodedAvatar", fileReader.result);
//     };
//     try {
//         fileReader.readAsDataURL(file);
//     } catch (e) {
//         alert("Failed to read image file.");
//     }
// }
// document.addEventListener('keydown', function() {
//     if (event.keyCode == 123) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     } else if (event.ctrlKey && event.keyCode == 85) {
//       alert("This function has been disabled to prevent you from stealing my code!");
//       return false;
//     }
//   }, false);
  
  // if (document.addEventListener) {
  //   document.addEventListener('contextmenu', function(e) {
  //     alert("This function has been disabled to prevent you from stealing my code!");
  //     e.preventDefault();
  //   }, false);
  // } else {
  //   document.attachEvent('oncontextmenu', function() {
  //     alert("This function has been disabled to prevent you from stealing my code!");
  //     window.event.returnValue = false;
  //   });
  // }

//   var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");


