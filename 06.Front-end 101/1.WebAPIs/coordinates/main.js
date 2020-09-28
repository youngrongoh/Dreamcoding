'use strict'

const vertical = document.querySelector('.vertical');
const horizontal = document.querySelector('.horizontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;

document.addEventListener('mousemove', e => {
    const x = e.clientX;
    const y = e.clientY;
    vertical.style.transform = `translateX(${x}px)`;
    horizontal.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.textContent = `${x}px, ${y}px`;
})

window.addEventListener('DOMContentLoaded', () => {
    const xInit = window.innerWidth / 2;
    const yInit = window.innerHeight / 2;
    vertical.style.transform = `translateX(${xInit}px)`;
    horizontal.style.transform = `translateY(${yInit}px)`;
    target.style.transform = `translate(${xInit - targetHalfWidth}px, ${yInit - targetHalfHeight}px)`;
    tag.style.transform = `translate(${xInit}px, ${yInit}px)`;
    tag.textContent = `${xInit}px, ${yInit}px`;
})