const teamScrollContainer = document.getElementById('team-scroll-container');
let isDown = false;
let startX;
let scrollLeft;

teamScrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - teamScrollContainer.offsetLeft;
    scrollLeft = teamScrollContainer.scrollLeft;
});

teamScrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
});

teamScrollContainer.addEventListener('mouseup', () => {
    isDown = false;
});

teamScrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - teamScrollContainer.offsetLeft;
    const walk = (x - startX) * 3;
    teamScrollContainer.scrollLeft = scrollLeft - walk;
});