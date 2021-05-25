const userId = localStorage.getItem('userId');
let lat;
let long;
let mode = 'add';
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${userId}`, {
  method: 'GET'
}).then(response => response.json()).then(data => {
  if (Object.keys(data).length) {
    // Profile Information is there.
    mode = 'update';
    document.getElementById("name").value = data.Name;
    document.getElementById("email").value = data.Email;
    document.getElementById("line1").value = data.Address.Line1;
    document.getElementById("line2").value = data.Address.Line2;
    document.getElementById("line3").value = data.Address.Line3 ? data.Address.Line3 : '';
    document.getElementById("city").value = data.Address.City
    document.getElementById("state").value = data.Address.State;
    document.getElementById("pinCode").value = data.PinCode;
  } else {
    document.getElementById('incompleteProfileError').style.display = 'block';
  }
}).catch((error) => {
  console.error('Error:', error);
});


function geolocationSuccess(pos) {
  var crd = pos.coords;
  lat = crd.latitude;
  long = crd.longitude;
}

function geolocationError(err) {
  document.getElementById('noGeolocationError').style.display = 'block';
  document.getElementById('exactGeolocationError').style.display = 'block';
  document.getElementById('exactGeolocationError').innerHTML = `GEOLOCATION ERROR(${err.code}): ${err.message}`;
}

navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions);

function updateUserDetails() {
  const phone = localStorage.getItem('mobileNumber');
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const line1 = document.getElementById("line1").value;
  const line2 = document.getElementById("line2").value;
  const line3 = document.getElementById("line3").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pinCode = document.getElementById("pinCode").value;

  const data = {
    userId,
    name,
    email,
    address: {
      line1,
      line2,
      line3,
      city,
      state,
    },
    pinCode,
    location: {
      lat,
      long
    }
  }

  if (!pinCode || Number(pinCode) === NaN || pinCode.length !== 6) {
    alert("Invalid PIN Code")
  } else if (!name || !email || !line1 || !city || !state || !line2) {
    alert("Fields marked with star (*) are required")
  } else {
    const url = mode === 'add' ? 'https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users' : 'https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users/update';
    mode === 'add' ? data['phone'] = phone : false;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'IxwzZBBo1A2ITRzf7Jlu59yHcCy7mjHr3OOPePqP'
      },
    }).then(response => response.json()).then(data => {
      window.location.reload();
    }).catch((error) => {
      alert('Unable to update records')
    });
  }
}

// window.onload = function () {
//   phoneNumberProfile.value = phoneNumber
//   phoneNumberProfile.readOnly = true

//   username.value = localStorage.getItem("username")
//   email.value = localStorage.getItem("email")
//   console.log(username.value)
//   console.log(email.value)
//   console.log(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`)

//   if (!username.value && !email.value) {

//   }
//   else {
//     submitProfileButton.style = "display:none"
//     profileMessage.innerHTML = "Congrats profile completed, go to Donation page to make a donation!"
//     profileMessage.style.color = "Blue"
//   }

//   // fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
//   //     method: 'POST'
//   // }).then(response => response.json()).then(data => {
//   //     if (Object.keys(data).length) {
//   //         console.log(data);
//   //     } else {
//   //         console.log('No Data')
//   //     }
//   // }).catch((error) => {
//   //     console.error('Error:', error);
//   // });

//   submitProfileButton.addEventListener("click", function () {



//     var data = JSON.stringify({
//       "userId": currentUser,
//       "name": document.getElementById("name").value,
//       "phone": phoneNumber.value,
//       "email": document.getElementById("email").value
//       // "address": {
//       //   "line1": "B/6",
//       //   "line2": "Street",
//       //   "line3": "Sector",
//       //   "city": "Bokaro",
//       //   "state": "Jharkhand"
//       // },
//       // "pinCode": "820002",
//       // "townID": "TWN001",
//       // "location": {
//       //   "lat": "23.5323",
//       //   "long": "32.77840"
//     });
//     var requestOptions = {
//       method: 'POST',
//       // headers: myHeaders,
//       body: data,
//       // redirect: 'follow'
//     };

//     console.log(data)
//     fetch("https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users", requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
//   });
// };
// // fetch('https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users', {
// //   method: 'POST', // or 'PUT'
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   },
// //   body: JSON.stringify(data),
// // })
// // .then(response => {
// //     console.log('Response:', response.json());
// // })
// // .then(data => {
// //   console.log('Success:', data);
// // })
// // .catch((error) => {
// //   console.error('Error:', error);
// // });
// // });
// // function encodeImageFileAsURL(fileElement) {
// //     const file = fileElement.files[0];
// //     const fileReader = new FileReader();
// //     fileReader.onloadend = (event) => {
// //         avatarImageElement.style.backgroundImage = `url('${fileReader.result}')`;
// //         localStorage.setItem("encodedAvatar", fileReader.result);
// //     };
// //     try {
// //         fileReader.readAsDataURL(file);
// //     } catch (e) {
// //         alert("Failed to read image file.");
// //     }
// // }
// // document.addEventListener('keydown', function() {
// //     if (event.keyCode == 123) {
// //       alert("This function has been disabled to prevent you from stealing my code!");
// //       return false;
// //     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
// //       alert("This function has been disabled to prevent you from stealing my code!");
// //       return false;
// //     } else if (event.ctrlKey && event.keyCode == 85) {
// //       alert("This function has been disabled to prevent you from stealing my code!");
// //       return false;
// //     }
// //   }, false);

//   // if (document.addEventListener) {
//   //   document.addEventListener('contextmenu', function(e) {
//   //     alert("This function has been disabled to prevent you from stealing my code!");
//   //     e.preventDefault();
//   //   }, false);
//   // } else {
//   //   document.attachEvent('oncontextmenu', function() {
//   //     alert("This function has been disabled to prevent you from stealing my code!");
//   //     window.event.returnValue = false;
//   //   });
//   // }

// //   var myHeaders = new Headers();
// // myHeaders.append("Content-Type", "application/json");


