'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
let navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark')
    } else {
        navbar.classList.remove('navbar--dark')
    }
})

// Handle scrolling when tapping on navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    // const navbarHeight = navbar.getBoundingClientRect().height;
    // const selectLink = document.querySelector(link);
    // const scrollY = selectLink.offsetTop - navbarHeight;
    // window.scrollTo({ top: scrollY, behavior: 'smooth' });
    scrollIntoView(link);
});

// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}