const toggleBtn = document.querySelector('.nav-toggle-btn');
const menu = document.querySelector('.nav-menu');
const icons = document.querySelector('.nav-sns');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});
