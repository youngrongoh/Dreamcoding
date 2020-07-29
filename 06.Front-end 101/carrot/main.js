'use strict'

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 3;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', _ => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
})

field.addEventListener('click', e => {
    if (e.target.className == 'carrot') {
        e.target.remove();
        gameScore.innerText--;
    } else if (e.target.className == 'bug') {
        finishGame();
    }
});

function startGame() {
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    popUp.classList.add('pop-up--hide');
    gameBtn.style.visibility = 'visibility';
}

function stopGame() {
    popUp.classList.remove('pop-up--hide');
    gameBtn.style.visibility = 'hidden';
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0 || !started) {
            clearInterval(timer);
            stopGame();
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png', CARROT_SIZE);
    addItem('bug', BUG_COUNT, 'img/bug.png', BUG_SIZE);
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





function showPopUp() {

}


