function $(id) { return document.getElementById(id); }

function loadImage(inputId, previewId, storageKey) {
    $(inputId).addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
            $(previewId).src = evt.target.result;
            localStorage.setItem(storageKey, evt.target.result);
            if (storageKey === 'profile-avatar') {
                localStorage.setItem('header-avatar', evt.target.result);
            }
        };
        reader.readAsDataURL(file);
    });
}

loadImage('avatarInput', 'avatarPreview', 'profile-avatar');
loadImage('bioImg1', 'bioPreview1', 'profile-bioimg1');
loadImage('bioImg2', 'bioPreview2', 'profile-bioimg2');

$('saveProfile').addEventListener('click', function () {
    localStorage.setItem('profile-name', $('name').value);
    localStorage.setItem('profile-pronouns', $('pronouns').value);
    localStorage.setItem('profile-socials', $('socials').value);
    localStorage.setItem('profile-bio', $('bio').value);
    localStorage.setItem('profile-interests', $('interests').value);
    localStorage.setItem('profile-Goals', $('Goals').value);

    localStorage.setItem('header-username', $('name').value);

    $('saveMsg').textContent = "🌸 Profile saved!";
});

window.addEventListener('DOMContentLoaded', function () {
    $('avatarPreview').src = localStorage.getItem('profile-avatar') || "profile-avatar.png";
    $('name').value = localStorage.getItem('profile-name') || "";
    $('pronouns').value = localStorage.getItem('profile-pronouns') || "";
    $('socials').value = localStorage.getItem('profile-socials') || "";
    $('bio').value = localStorage.getItem('profile-bio') || "";
    $('interests').value = localStorage.getItem('profile-interests') || "";
    $('Goals').value = localStorage.getItem('profile-Goals') || "";
});
