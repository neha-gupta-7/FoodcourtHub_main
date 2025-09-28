// Firebase Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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

// Register Form Submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Update user profile with the username
            return updateProfile(user, { displayName: username });
        })
        .then(() => {
            alert("Registration successful! Redirecting to login page.");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
});


