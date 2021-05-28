const userId = localStorage.getItem('userId');

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${userId}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    if (!Object.keys(data).length) {
        window.location.href = 'userProfile'
    } else {
        const images = sessionStorage.getItem('images');
        const medicines = sessionStorage.getItem('medicines');
        sessionStorage.setItem('userdata', JSON.stringify(data));
        if (images && medicines) {
            $('#donationDetails').show();
            document.getElementById("name").innerHTML = data.Name;
            document.getElementById("email").innerHTML = data.Email;
            document.getElementById("phone").innerHTML = data.Phone;
            document.getElementById("line1").innerHTML = data.Address.Line1;
            document.getElementById("line2").innerHTML = data.Address.Line2;
            document.getElementById("line3").innerHTML = data.Address.Line3 ? data.Address.Line3 : '';
            document.getElementById("city").innerHTML = data.Address.City
            document.getElementById("state").innerHTML = data.Address.State;
            document.getElementById("pinCode").innerHTML = data.PinCode;
            JSON.parse(medicines).forEach(medicine => {
                const template = `<li>${medicine.medicineDetails.name}(${medicine.medicineDetails.type}) - ${medicine.quantity} Nos</li>`
                $('#donations').append(template);
            });
            JSON.parse(images).forEach(image => {
                const template = `<img src="${image.data}" class="img-rounded" style="width: 10vh; height: 10vh; margin-bottom: 10px;">`;
                $('#images').append(template);
            });
        } else {
            $("#error").show();
        }
    }
}).catch((error) => {
    console.error('Error:', error);
});

function confirmDonation() {
    const medicines = JSON.parse(sessionStorage.getItem('medicines'));
    const images = JSON.parse(sessionStorage.getItem('images'));
    const address = JSON.parse(sessionStorage.getItem('userdata')).Address;
    const pinCode = JSON.parse(sessionStorage.getItem('userdata')).PinCode;
    const location = JSON.parse(sessionStorage.getItem('userdata')).Location;
    const data = {
        userId,
        medicines,
        images,
        address,
        pinCode,
        location,
    }

    fetch("https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/donate", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'IxwzZBBo1A2ITRzf7Jlu59yHcCy7mjHr3OOPePqP'
        },
    }).then(response => response.json()).then(result => {
        if (!result.message.toLowerCase().includes('error')) {
            $('#donationDetails').hide();
            $('#success').show();
            sessionStorage.clear();
        } else {
            alert(result.message);
        }
    }).catch(error => alert('Server Error. Try again please'));
}
