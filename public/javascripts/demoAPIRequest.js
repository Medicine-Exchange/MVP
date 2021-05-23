const currentUser = localStorage.getItem('userId');

const username  = document.getElementById("name")
const email  = document.getElementById("email")
const phoneNumber = document.getElementById("mobile_number")
const data = { userId: currentUser ,
name: username,
phone: phoneNumber,
email: email };

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    if (Object.keys(data).length) {
        console.log(Object)
        //set

      //  return

    } else {
        console.log('No Data')
    }
}).catch((error) => {
    console.error('Error:', error);
});

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


fetch('https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users', {
  method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
  body: JSON.stringify(data),
})
.then(response => {
    console.log('Response:', response.json());
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

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
  
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      alert("This function has been disabled to prevent you from stealing my code!");
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      alert("This function has been disabled to prevent you from stealing my code!");
      window.event.returnValue = false;
    });
  }