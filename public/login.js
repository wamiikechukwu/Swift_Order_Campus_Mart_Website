var firebaseConfig = {
    apiKey: 'AIzaSyAUy0Z98qIqoK3jHmDzsiU7QSvbPo1gthg',
    authDomain: 'swift-order-campus-mart.firebaseapp.com',
    databaseURL: 'https://console.firebase.google.com/project/undefined/firestore/data/',
    storageBucket: 'swift-order-campus-mart.appspot.com'
};
firebase.initializeApp(firebaseConfig);

//variables
let userEmail;
let userPassword;

//users value
function getUsersvalues(){
    userEmail = document.getElementById("inputEmail").value
    userPassword = document.getElementById("inputPassword").value
}

//btn handler
const loginBtn = document.getElementById("signInBtn");
loginBtn.addEventListener("click", (e) => {
    e.preventDefault()

    getUsersvalues()
    registerUser(userEmail, userPassword)
})

function registerUser(userEmail, userPassword){
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            window.location.replace("./add-item.html");

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)

        });
}

