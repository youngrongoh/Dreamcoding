'use strict'

const field = document.querySelector('.game__field');
const gameBtn = document.querySelector('.game__button');

let started = false;

gameBtn.addEventListener('click', _ => {
    started = !started;
    const gameBtnIcon = document.querySelector('.fas');
    if (started) {
        gameBtnIcon.classList.remove('fa-stop');
        gameBtnIcon.classList.add('fa-play');
    } else {
        gameBtnIcon.classList.remove('fa-play');
        gameBtnIcon.classList.add('fa-stop');
    }
})

