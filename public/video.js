document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('birthday-video');
    const card = document.getElementById('birthday-card');

    // When the video ends, show the card
    video.addEventListener('ended', function() {
        card.style.display = 'block';
    });
});