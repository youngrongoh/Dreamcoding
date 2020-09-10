'use strict'

const navbar = document.querySelector('#navbar');
const navbarMenu = navbar.querySelector('.navbar__menu');
const navbarHeight = navbar.getBoundingClientRect().height;
const home = document.querySelector('#home');
const contents = home.querySelector('.home__contents');
const homeHeight = home.getBoundingClientRect().height;
const contactBtn = document.querySelector('.home__contactBtn');
const arrowBtn = document.querySelector('.arrowBtn');


// Change bg color of navbar to pink
function changeNavColor(scroll) {
    const _scrollY = scroll;
    if (_scrollY >= navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
}

// Change active state on navbar menu as scrolling
function focusNavMenu(scroll) {
    const _scrollY = scroll;
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        const bodyHeight = document.body.offsetHeight;
        const scrollMax = Math.ceil(window.innerHeight + window.pageYOffset);
        const navbarHeight = navbar.getBoundingClientRect().height;
        const sectionHeight = section.getBoundingClientRect().height;
        const y1 = section.offsetTop - navbarHeight;
        const y2 = y1 + sectionHeight;
        const changeActive = (id) => {
            const prev = navbarMenu.querySelector('.menu__item--active');
            prev.classList.remove('menu__item--active');
            const next = navbarMenu.querySelector(`[data-link="#${id}"]`);
            next.classList.add('menu__item--active');
        }
        if (bodyHeight === scrollMax) {
            const id = 'contact'
            changeActive(id)
            return;
        }
        if (_scrollY >= y1 && _scrollY < y2) {
            const id = section.id
            changeActive(id)
        }
    });
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}


// Adjust opacity of home contents gradually as scrolling
function adjustHomeOpacity(scroll) {
    if (scroll <= homeHeight) {
        const opacityVal = scroll / (homeHeight * 0.6);
        contents.style.opacity = 1 - opacityVal;
    }
}

// Show arrowBtn when scrolling down
function showArrowBtn(scroll) {
    if (scroll > homeHeight / 2) {
        arrowBtn.classList.add('arrowBtn--visible');
    } else {
        arrowBtn.classList.remove('arrowBtn--visible');
    }
}

// Handle click on the arrowBtn
arrowBtn.addEventListener('click', () => {
    scrollIntoView('#home');
});

document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    changeNavColor(scrollY);
    focusNavMenu(scrollY);
    adjustHomeOpacity(scrollY);
    showArrowBtn(scrollY);
});

// Handle scrolling when tapping on the navbar menu
navbarMenu.addEventListener('click', e => {
    const target = e.target;
    const link = target.dataset.link;
    if (link === null) {
        return;
    }
    scrollIntoView(link);
});

// Handle click on "contact me" button on home
contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});
