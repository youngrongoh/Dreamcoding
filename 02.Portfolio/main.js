'use strict'

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Change bg color of navbar to pink
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY >= navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});