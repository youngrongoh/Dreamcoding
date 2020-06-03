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


// Make home slowly fade to transparent as the window scroll down
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    const calc = 1 - window.scrollY / homeHeight
    if (calc < 0) {
        return;
    }
    home.children[0].style.opacity = calc;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
// const categories = document.querySelector('.work__categories');
// categories.addEventListener('click', (event) => {
//     const target = event.target;
//     const category = target.dataset.categoryNum;
//     const projects = document.querySelectorAll('.project');
//     for (let i = 0; i < categories.children.length; i++) {
//         categories.children[i].classList.remove('active')
//     }
//     target.classList.add('active');
//     if (!category) {
//         return;
//     } else if (category == 0) {
//         for (let project of projects) {
//             project.classList.add('visible');
//         }
//         return;
//     }
//     for (let project of projects) {
//         if (category == project.dataset.categoryNum) {
//             project.classList.add('visible');
//         } else {
//             project.classList.remove('visible');
//         }
//     };
// });
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
})






function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
}