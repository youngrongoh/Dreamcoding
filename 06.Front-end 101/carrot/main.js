'use strict'

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');

const CARROT_SIZE = 80;

let CARROT_COUNT = 5;
let started = false;

function init() {
    for (let i = 0; i < CARROT_COUNT; i++) {
        const carrot = createItem('carrot');
        const bug = createItem('bug');
        const x1 = setRandomCoordinate().x
        const y1 = setRandomCoordinate().y
        const x2 = setRandomCoordinate().x
        const y2 = setRandomCoordinate().y
        carrot.style.transform = `translate(${x1}px, ${y1}px)`;
        bug.style.transform = `translate(${x2}px, ${y2}px)`;
        field.appendChild(carrot);
        field.appendChild(bug);
    }
}

function createItem(name) {
    const item = document.createElement('img');
    item.setAttribute('class', name);
    item.setAttribute('src', `./img/${name}.png`);
    return item;
}

function setRandomCoordinate() {
    const x = Math.random() * (fieldRect.width - CARROT_SIZE);
    const y = Math.random() * (fieldRect.height - CARROT_SIZE);
    return { x: x, y: y }
}



gameBtn.addEventListener('click', _ => {
    started = !started;
    const gameBtnIcon = document.querySelector('.fas');
    if (started) {
        gameBtnIcon.classList.remove('fa-stop');
        gameBtnIcon.classList.add('fa-play');
        field.innerHTML = '';
        init();
    } else {
        gameBtnIcon.classList.remove('fa-play');
        gameBtnIcon.classList.add('fa-stop');
    }
})

