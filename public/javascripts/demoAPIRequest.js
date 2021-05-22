const currentUser = localStorage.getItem('userId');

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=${currentUser}`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    console.log('Success:', data);
}).catch((error) => {
    console.error('Error:', error);
});
