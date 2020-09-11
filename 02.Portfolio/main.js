'use strict'

const navbar = document.querySelector('#navbar');
const navbarMenu = navbar.querySelector('.navbar__menu');
const navbarHeight = navbar.getBoundingClientRect().height;
const toggleBtn = navbar.querySelector('.navbar__toggleBtn');
const home = document.querySelector('#home');
const contents = home.querySelector('.home__contents');
const homeHeight = home.getBoundingClientRect().height;
const contactBtn = document.querySelector('.home__contactBtn');

const categories = document.querySelector('.work__categories');
const projectsContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project');

const arrowBtn = document.querySelector('.arrowBtn');

// Change bg color of navbar to pink
function changeNavColor(scroll) {
    if (navbarMenu.classList.contains('navbar__menu--visible')) {
        return;
    }
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

function activeCategoryBtn(next) {
    const prev = categories.querySelector('.categoryBtn--active');
    prev.classList.remove('categoryBtn--active');
    next.classList.add('categoryBtn--active');
}

function filterProjects(index) {
    projects.forEach(project => {
        const link = Number(project.dataset.indexLink);
        projectsContainer.classList.add('work__projects--anim-out');
        setTimeout(() => {
            if (link === index || index === 0) {
                project.classList.remove('project--invisible');
            } else {
                project.classList.add('project--invisible');
            }
            projectsContainer.classList.remove('work__projects--anim-out');
        }, 300);
    });
}

function updateProjectCount() {
    const btns = categories.querySelectorAll('.categoryBtn');
    const counts = [];
    btns.forEach(btn => {
        const index = btn.dataset.index;
        counts[index] = 0;
    });
    projects.forEach(project => {
        const link = project.dataset.indexLink;
        counts[link] += 1;
        counts[0] += 1;
    });
    btns.forEach(btn => {
        const index = btn.dataset.index;
        const count = btn.querySelector('.categoryBtn__count');
        count.innerText = counts[index];
    });
};

toggleBtn.addEventListener('click', () => {
    navbar.classList.add('navbar--dark');
    navbarMenu.classList.toggle('navbar__menu--visible');
})

categories.addEventListener('click', e => {
    const target =
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentElement;
    const index = Number(target.dataset.index);
    if (target.classList.contains('categoryBtn--active') || isNaN(index)) {
        return;
    }
    activeCategoryBtn(target);
    filterProjects(index);
});

document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    changeNavColor(scrollY);
    focusNavMenu(scrollY);
    adjustHomeOpacity(scrollY);
    showArrowBtn(scrollY);
});

// Handle click on the arrowBtn
arrowBtn.addEventListener('click', () => {
    scrollIntoView('#home');
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

window.addEventListener('load', updateProjectCount);