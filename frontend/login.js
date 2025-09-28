// Firebase Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbDJ-H0shbMpJFyLg6m5iLe5gm70u8OXU",
    authDomain: "foodcourtauth.firebaseapp.com",
    projectId: "foodcourtauth",
    storageBucket: "foodcourtauth.firebasestorage.app",
    messagingSenderId: "878454192640",
    appId: "1:878454192640:web:bb6a27386ad1b238a076e5",
    measurementId: "G-5WFG7GW017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", user.email.split('@')[0]); // Username from email

            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to home page
        })
        .catch((error) => {
            alert(error.message);
        });
});


