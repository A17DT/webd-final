const form = document.getElementById('signupForm');
const errorMsg = document.getElementById('errorMsg');

const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');

    const username = usernameInput.value.trim().toLowerCase();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.status === 409) {
            errorMsg.textContent = 'An account already exists with this email!';
            errorMsg.classList.add('visible');
            usernameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
        } else if (response.ok) {
            window.location.href = 'chill.html';
        } else {
            errorMsg.textContent = 'Signup failed. Please try again.';
            errorMsg.classList.add('visible');
            usernameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
        }

    } catch (error) {
        console.error(error);
        errorMsg.textContent = 'Server error. Please try later.';
        errorMsg.classList.add('visible');
    }
});
