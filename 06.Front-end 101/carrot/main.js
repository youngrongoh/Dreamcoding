'use strict'

const CARROT_SIZE = 80;
const BUG_SIZE = 50;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');

let CARROT_COUNT = 5;
let started = false;

function initGame() {
    addItem('carrot', 5, 'img/carrot.png', CARROT_SIZE);
    addItem('bug', 5, 'img/bug.png', BUG_SIZE);
}

function addItem(className, count, imgPath, padding) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - padding;
    const y2 = fieldRect.height - padding;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}



gameBtn.addEventListener('click', _ => {
    started = !started;
    const gameBtnIcon = document.querySelector('.fas');
    if (started) {
        gameBtnIcon.classList.remove('fa-play');
        gameBtnIcon.classList.add('fa-stop');
        field.innerHTML = '';
        initGame();
    } else {
        gameBtnIcon.classList.remove('fa-stop');
        gameBtnIcon.classList.add('fa-play');
    }
})

