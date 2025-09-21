// public/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const showLoginLink = document.getElementById('show-login');
    const showSignupLink = document.getElementById('show-signup');
    const errorMessage = document.getElementById('error-message');

    // Logic to switch from Signup form to Login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });

    // Logic to switch from Login form to Signup form
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Logic to handle the SIGNUP form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // Clear previous errors
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            alert('Signup successful! Please log in.');
            loginForm.classList.remove('hidden'); // Show login form
            signupForm.classList.add('hidden');
        } else {
            const data = await response.json();
            errorMessage.textContent = data.message;
        }
    });

    // Logic to handle the LOGIN form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessage.textContent = ''; // Clear previous errors
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            // Save user info in the browser's local storage
            localStorage.setItem('loggedInUser', data.username);
            // Redirect to the dashboard
            window.location.href = '/';
        } else {
            const data = await response.json();
            errorMessage.textContent = data.message;
        }
    });
});