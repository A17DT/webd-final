const form = document.getElementById('signinForm');
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
        const response = await fetch('http://webd-final-jwdg.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.status === 404) {
            errorMsg.textContent = 'No account found with this email and username.';
            errorMsg.classList.add('visible');
        } else if (response.status === 401) {
            errorMsg.textContent = 'Incorrect password.';
            errorMsg.classList.add('visible');
        } else if (response.ok) {
            window.location.href = 'chill.html';
        } else {
            errorMsg.textContent = 'Login failed. Please try again.';
            errorMsg.classList.add('visible');
        }

    } catch (error) {
        console.error(error);
        errorMsg.textContent = 'Server error. Please try later.';
        errorMsg.classList.add('visible');
    }
});
