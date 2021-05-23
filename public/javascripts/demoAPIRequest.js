const currentUser = localStorage.getItem('userId');

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    if (Object.keys(data).length) {
        console.log(data);
    } else {
        console.log('No Data')
    }
}).catch((error) => {
    console.error('Error:', error);
});

function encodeImageFileAsURL(fileElement) {
    const file = fileElement.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (event) => {
        avatarImageElement.style.backgroundImage = `url('${fileReader.result}')`;
        localStorage.setItem("encodedAvatar", fileReader.result);
    };
    try {
        fileReader.readAsDataURL(file);
    } catch (e) {
        alert("Failed to read image file.");
    }
}
