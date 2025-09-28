// Firebase Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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

// Chatbot Toggle Logic
document.getElementById("chatbotToggle").addEventListener("click", function () {
    let chatbotContainer = document.getElementById("chatbotContainer");
    chatbotContainer.style.display = chatbotContainer.style.display === "block" ? "none" : "block";
});

// Elements for Authentication Handling
const loginButton = document.getElementById("login-btn"); // Navbar Login
const sidebarLoginButton = document.getElementById("sidebar-login"); // Sidebar Login
const userDropdown = document.getElementById("user-dropdown"); // Navbar User Dropdown
const sidebarUserDropdown = document.getElementById("sidebar-user-dropdown"); // Sidebar User Dropdown
const usernameDisplay = document.getElementById("username-display"); // Navbar Username
const sidebarUsernameDisplay = document.getElementById("sidebar-username-display"); // Sidebar Username
const logoutButton = document.getElementById("logout-btn"); // Navbar Logout
const sidebarLogoutButton = document.getElementById("sidebar-logout-btn"); // Sidebar Logout

// Track User Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        loginButton.style.display = "none";
        sidebarLoginButton.style.display = "none";
        userDropdown.style.display = "block";
        sidebarUserDropdown.style.display = "block";
        usernameDisplay.textContent = `👤 ${user.displayName || "User"}`;
        sidebarUsernameDisplay.textContent = `👤 ${user.displayName || "User"}`;
    } else {
        // User is logged out
        loginButton.style.display = "block";
        sidebarLoginButton.style.display = "block";
        userDropdown.style.display = "none";
        sidebarUserDropdown.style.display = "none";
    }
});

// Logout Functionality
function handleLogout() {
    signOut(auth)
        .then(() => {
            window.location.reload(); // Refresh page after logout
        })
        .catch((error) => {
            console.error("Logout Error:", error);
        });
}

// Event Listeners for Logout
logoutButton.addEventListener("click", handleLogout);
sidebarLogoutButton.addEventListener("click", handleLogout);

// Prevent Navigation Without Login
let isUserLoggedIn = false;

onAuthStateChanged(auth, (user) => {
    isUserLoggedIn = !!user;
    console.log("User login status updated:", isUserLoggedIn);
});

function checkLogin(event) {
    if (!isUserLoggedIn) {
        event.preventDefault();
        alert("Please login first.");
        return false;
    }
    return true;
}


