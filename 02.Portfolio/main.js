'use strict'

const navbar = document.querySelector('#navbar');
const navbarMenu = navbar.querySelector('.navbar__menu');
const navbarHeight = navbar.getBoundingClientRect().height;
const contactBtn = document.querySelector('.home__contactBtn');

// Change bg color of navbar to pink
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY >= navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});


// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener('click', e => {
    const target = e.target;
    const link = target.dataset.link;
    if (link === null) {
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
});

contactBtn.addEventListener('click', () => {
    const contact = document.querySelector('#contact');
    contact.scrollIntoView({ behavior: 'smooth' });
});