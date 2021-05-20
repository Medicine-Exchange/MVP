const currentPathname = window.location.pathname;
const isLoggedInVariableSet = localStorage.getItem('userId');

function setUserLoggedInVariableIfNotPresent() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user && !isLoggedInVariableSet) {
            localStorage.setItem("userId", user.uid);
            window.location.reload();
        }
    });
}

if (isLoggedInVariableSet) {
    if (currentPathname.toLowerCase().includes('login')) {
        // We are on the login page... We will redirect to the user Profile page
        window.location.href = "/userProfile"
    }
} else {
    setUserLoggedInVariableIfNotPresent();
    if (currentPathname.toLowerCase().includes('userprofile')) {
        // User is signed out yet the user is on the profile page
        window.location.href = "/login"
    }
}

function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem("userId");
        window.location.href = "/login"
    }).catch((error) => {
        alert('Failed to log out');
    });

}