import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";  

const firebaseConfig = {
    apiKey: "AIzaSyCyNUw4nNjdwbPK2XDBGF-SrXH74arP3oY",
    authDomain: "loginbai.firebaseapp.com",
    projectId: "loginbai",
    storageBucket: "loginbai.appspot.com",
    messagingSenderId: "70771945494",
    appId: "1:70771945494:web:ed98501cfe9b3e7400c537"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid),{
                email: email
            })
            alert("Account Signed Up!");
            window.location.href = "login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    login.addEventListener('click', (e)=>{
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
          });
    });
});
