'use strict';

const titleScreen = document.querySelector('.game__title-screen');
const startBtn = titleScreen.querySelector('.title-screen__start');
const playBtn = document.querySelector('.header__play');

// hide title screen when start btn is clicked
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

// start timer when play btn is clicked

// start timer when replay btn is clicked
// count down as clicking carrots
// init game
// put every items on field randomly
// display pop up when timer is done
// display pop up when bugs are clicked
// play bgm when the game is started
// change pop up message as result of game(win, lose, stop)
