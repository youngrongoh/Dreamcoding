'use strict'

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const time = 3;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');

const CARROT_COUNT = 5;
let started = false;

function startGame() {
    field.innerHTML = '';
    popUp.classList.add('pop-up--hide');
    gameBtn.style.visibility = 'visibility';
    showTimerAndScore();
    initGame();
    setTimer();
}

function stopGame() {
    popUp.classList.remove('pop-up--hide');
    gameBtn.style.visibility = 'hidden';
}

function initGame() {
    addItem('carrot', 5, 'img/carrot.png', CARROT_SIZE);
    addItem('bug', 5, 'img/bug.png', BUG_SIZE);
    score.innerText = CARROT_COUNT;
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

function setTimer() {
    let seconds = time;
    const timer = setInterval(() => {
        let timerText = `${Math.floor(seconds / 60)}:${seconds % 60}`;
        gameTimer.innerText = timerText;
        if (seconds === 0 || !started) {
            clearInterval(timer);
            stopGame();
            return;
        }
        seconds--
    }, 1000)
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    score.style.visibility = 'visible';
}

function showPopUp() {

}

gameBtn.addEventListener('click', _ => {
    started = !started;
    const gameBtnIcon = document.querySelector('.fas');
    if (started) {
        gameBtnIcon.classList.remove('fa-play');
        gameBtnIcon.classList.add('fa-stop');
        startGame();
    } else {
        gameBtnIcon.classList.remove('fa-stop');
        gameBtnIcon.classList.add('fa-play');
        stopGame();
    }
})

field.addEventListener('click', e => {
    if (e.target.className == 'carrot') {
        e.target.remove();
        score.innerText--;
    } else if (e.target.className == 'bug') {
        finishGame();
    }
});
