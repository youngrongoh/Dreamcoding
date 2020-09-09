'use strict'

const navbar = document.querySelector('#navbar');
const navbarMenu = navbar.querySelector('.navbar__menu');
const navbarHeight = navbar.getBoundingClientRect().height;
const contactBtn = document.querySelector('.home__contactBtn');
const sections = document.querySelectorAll('section');
const contact = document.querySelector('#contact');

// Change bg color of navbar to pink
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY >= navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }

    sections.forEach((section) => {
        const bodyHeight = document.body.offsetHeight;
        const scrollMax = Math.ceil(window.innerHeight + window.pageYOffset);
        const navbarHeight = navbar.getBoundingClientRect().height;
        const sectionHeight = section.getBoundingClientRect().height;
        const y1 = section.offsetTop - navbarHeight;
        const y2 = y1 + sectionHeight;
        if (bodyHeight === scrollMax) {
            const prev = navbarMenu.querySelector('.menu__item--active');
            prev.classList.remove('menu__item--active');
            const next = navbarMenu.querySelector(`[data-link="#contact"]`);
            next.classList.add('menu__item--active');
            return;
        }
        if (scrollY >= y1 && scrollY < y2) {
            const id = section.id
            const prev = navbarMenu.querySelector('.menu__item--active');
            prev.classList.remove('menu__item--active');
            const next = navbarMenu.querySelector(`[data-link="#${id}"]`);
            next.classList.add('menu__item--active');
        }
    });
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
    contact.scrollIntoView({ behavior: 'smooth' });
});