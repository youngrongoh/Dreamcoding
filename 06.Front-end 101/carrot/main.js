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
const popUpText = document.querySelector('.pop-up__message')
const popUpRefresh = document.querySelector('.pop-up__refresh')

const backgroundSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', _ => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
})

popUpRefresh.addEventListener('click', () => {
    startGame();
    hidePopUp();
});

function startGame() {
    backgroundSound.currentTime = 0;
    backgroundSound.play();
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    alertSound.play();
    started = false;
    stopGameTimer();
    hideGameButton();
    finishGame('stop');
}

function finishGame(win) {
    backgroundSound.pause();
    started = false;
    hideGameButton();
    stopGameTimer();
    switch (win) {
        case 'win':
            winSound.play();
            showPopUpWithText('YOU WON 🎉');
            break;
        case 'lose':
            showPopUpWithText('YOU LOSE 💩');
            break;
        case 'stop':
            showPopUpWithText('REPLAY ❓');
            break;
    }
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';

}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}

function hidePopUp() {
    popUp.classList.add('pop-up--hide');
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            finishGame('lose');
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, 'img/carrot.png', CARROT_SIZE);
    addItem('bug', BUG_COUNT, 'img/bug.png', BUG_SIZE);
}

function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        updateScoreBoard();
        carrotSound.play();
        if (score === CARROT_COUNT) {
            finishGame('win');
        }
    } else if (target.matches('.bug')) {
        stopGameTimer();
        finishGame('lose');
        bugSound.play();
    }
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
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



