window.addEventListener('DOMContentLoaded', function () {
    const avatarImg = document.querySelector('.avatar-section-header img');
    const usernameDiv = document.querySelector('.avatar-section-header .username');

    const savedAvatar = localStorage.getItem('header-avatar');
    const savedUsername = localStorage.getItem('header-username');

    if (savedAvatar) {
        avatarImg.src = savedAvatar;
    }

    if (savedUsername) {
        usernameDiv.textContent = savedUsername;
    }
});

