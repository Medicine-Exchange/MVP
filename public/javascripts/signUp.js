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
