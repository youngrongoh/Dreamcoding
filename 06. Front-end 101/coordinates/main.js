const horizental = document.querySelector('.horizental');
const vertical = document.querySelector('.vertical');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;

function moveX(obj, x) {
    obj.style.transform = `translateX(${x}px)`;
}
function moveY(obj, y) {
    obj.style.transform = `translateY(${y}px)`;
}
function moveXY(obj, x, y) {
    obj.style.transform = `translate(${x}px, ${y}px)`;
}
function coordinatesNum(obj, x, y) {
    obj.innerHTML = `${x}px, ${y}px`
}

window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    moveY(horizental, y);
    moveX(vertical, x);
    moveXY(target, x - targetHalfWidth, y - targetHalfHeight);
    moveXY(tag, x + 20, y + 20);
    coordinatesNum(tag, x, y);
});

const tagRect = tag.getBoundingClientRect();
const windowHalfWidth = window.innerWidth / 2;
const windowHalfHeight = window.innerHeight / 2;
const tagCenterX = windowHalfWidth + tagRect.x + 20;
const tagCenterY = windowHalfHeight + tagRect.y + 20;
const targetCenterX = windowHalfWidth - targetHalfWidth;
const targetCenterY = windowHalfHeight - targetHalfHeight;

moveXY(tag, tagCenterX, tagCenterY);
moveXY(target, targetCenterX, targetCenterY);
coordinatesNum(tag, windowHalfWidth, windowHalfHeight);