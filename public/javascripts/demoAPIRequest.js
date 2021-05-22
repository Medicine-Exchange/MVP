// import Requester from './requester';

const currentUser = localStorage.getItem('userId');

fetch(`https://a6onovzgof.execute-api.ap-south-1.amazonaws.com/dev/users?userId=11b94c45-1ae8-4afd-aa3a-a11a7afd5367`, {
    method: 'GET'
}).then(response => response.json()).then(data => {
    console.log('Success:', data);
}).catch((error) => {
    console.error('Error:', error);
});
