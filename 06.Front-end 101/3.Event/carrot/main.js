'use strict';

const titleScreen = document.querySelector('.game__title-screen');
const startBtn = titleScreen.querySelector('.title-screen__start');
const playBtn = document.querySelector('.header__play');
const timerText = document.querySelector('.header__timer');
const count = document.querySelector('.header__count');
const field = document.querySelector('.game__field');
const popUp = document.querySelector('.game__pop-up');
const popUpMessage = popUp.querySelector('.pop-up__message');

const SET_TIME_AS_SECOND = 10;
const CARROT_COUNT = 3;
const BUG_COUNT = 3;
const CARROT_SIZE = 80;
const BUG_SIZE = 50;

let timer;

// hide title screen when startBtn is clicked
startBtn.addEventListener('click', () => {
  titleScreen.classList.add('game__title-screen--hide');
})

// toggle icon of playBtn
playBtn.addEventListener('click', e => {
  let target;
  if (e.target.nodeName === 'BUTTON') {
    target = e.target.querySelector('.fas');
  } else {
    target = e.target;
  }
  if(target.classList.contains('fa-play')) {
    target.classList.replace('fa-play', 'fa-stop');
    startGame();
  } else {
    target.classList.replace('fa-stop', 'fa-play');
    stopGame();
  }
})

// set timer
// 1) change timer text
function updateTimerText(time) {
  const minutes = time / 60 > 9 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
  const seconds = time % 60 > 9 ? time % 60 : `0${time % 60}`;
  timerText.textContent = `${minutes}:${seconds}`
}
// 2) start timer
function setTimer() {
  let time = SET_TIME_AS_SECOND;
  updateTimerText(time);
  timer = setInterval(()=> {
    if(time <= 0) {
      finishGame('lose');
      return;
    }
    time--;
    updateTimerText(time);
  }, 1000)
}
// 3) stop timer
// stop timer
function stopTimer() {
  clearInterval(timer);
}

function createItem(className) {
  const item = document.createElement('div');
  item.setAttribute('class', className);
  return item;
}

function setRandomCoordinates(item, size) {
  const x = Math.floor(Math.random() * (field.offsetWidth - size));
  const y = Math.floor(Math.random() * (field.offsetHeight- size));
  item.style.left = x + 'px';
  item.style.top = y + 'px';
}

function addItemsRandomly(className, count, itemSize) {
  for(let i = 0; i < count; i++) {
    const item = createItem(className);
    setRandomCoordinates(item, itemSize);
    field.appendChild(item);
  }
}

function togglePopUp(state) {
  switch(state) {
    case 'show' : 
      popUp.classList.add('visible');
      break;
    case 'hide' :
      popUp.classList.remove('visible');
      break;
  }
}

function changePopUpMessage(result) {
  switch (result) {
    case 'win' :
      popUpMessage.textContent = 'YOU WON! 🏆';
      break;
    case 'lose' :
      popUpMessage.textContent = 'YOU LOST 💩';
      break;
    case 'stop' :
      popUpMessage.textContent = 'TRY AGAIN! 🙌';
      break;
  }
}

// init game
function initGame() {
  field.innerHTML = '';
  count.textContent = CARROT_COUNT;
  addItemsRandomly('carrot', CARROT_COUNT, CARROT_SIZE);
  addItemsRandomly('bug', BUG_COUNT, BUG_SIZE);
}

// game state
function startGame() {
  initGame();
  setTimer();
  togglePopUp('hide')
}

function stopGame() {
  stopTimer();
  changePopUpMessage('stop');
  togglePopUp('show');
}

function finishGame(result) {
  stopTimer();
  changePopUpMessage(result);
  togglePopUp('show');
}

// handle clicking item on a field
field.addEventListener('click', e => {
  const className = e.target.classList;
  if (className.contains('field')) {
    return;
  }

  if(className.contains('carrot')) {
    count.textContent--
    e.target.remove();
    if (count.textContent == 0) {
      finishGame('win');
    }
  } else {
    finishGame('lose');
  }
})

// play bgm when the game is started
// change pop up message as result of game(win, lose, stop)
