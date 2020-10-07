'use strict';

const titleScreen = document.querySelector('.game__title-screen');
const startBtn = titleScreen.querySelector('.title-screen__start');
const playBtn = document.querySelector('.header__play');
const timerText = document.querySelector('.header__timer');

let timer;

const SET_TIME_AS_SECOND = 10;

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
  } else {
    target.classList.replace('fa-stop', 'fa-play');
  }
})

// set timer
// 1) change timer text
function changeTimerText(time) {
  const minutes = time / 60 > 10 ? Math.floor(time / 60) : `0${Math.floor(time / 60)}`;
  const seconds = time % 60 > 10 ? time % 60 : `0${time % 60}`;
  timerText.textContent = `${minutes}:${seconds}`
}
// 2) start timer
function startTimer() {
  let time = SET_TIME_AS_SECOND;
  timer = setInterval(()=> {
    changeTimerText(time);
    time--;
  }, 1000)
}
// 3) stop timer
// stop timer
function stopTimer() {
  clearInterval(timer);
}

// count down as clicking carrots
// init game
// put every items on field randomly
// display pop up when timer is done
// display pop up when bugs are clicked
// play bgm when the game is started
// change pop up message as result of game(win, lose, stop)
