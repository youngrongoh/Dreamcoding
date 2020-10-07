'use strict';

const titleScreen = document.querySelector('.game__title-screen');
const startBtn = titleScreen.querySelector('.title-screen__start');

// hide title screen when start btn is clicked
startBtn.addEventListener('click', () => {
  titleScreen.classList.add('game__title-screen--hide');
})

// play btn toggle
// start timer when play btn is clicked
// start timer when replay btn is clicked
// count down as clicking carrots
// init game
// put every items on field randomly
// display pop up when timer is done
// display pop up when bugs are clicked
// play bgm when the game is started
// change pop up message as result of game(win, lose, stop)
