const horizental = document.querySelector('.horizental');
const vertical = document.querySelector('.vertical');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

function moveX(obj, x) {
    obj.style.left = x;
}
function moveY(obj, y) {
    obj.style.top = y;
}
function moveXY(obj, x, y) {
    moveX(obj, x);
    moveY(obj, y);
}

window.addEventListener('mousemove', (e) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    moveY(horizental, y);
    moveX(vertical, x);
    moveXY(target, x, y);
    moveXY(tag, x, y);
    tag.innerHTML = `${x}, ${y}`
});