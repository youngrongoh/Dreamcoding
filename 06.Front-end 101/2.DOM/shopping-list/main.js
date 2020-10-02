'use strict';

const main = document.querySelector('.shopping-list__main');
const list = document.querySelector('.main__list');
const input = document.querySelector('#input-text');
const plusBtn = document.querySelector('.footer__plus');

function createItem(value) {
  const item = document.createElement('li');
  item.innerHTML =
  `<li class="main__item">
    <span class="item__desc">${value}</span>
    <button class="item__delete">
        <i class="fas fa-trash"></i>
    </button>
  </li>`;
  return item;
}

function addDeleteListener(item) {
  const deleteBtn = item.querySelector('.item__delete');
  deleteBtn.addEventListener('click', () => {
    list.removeChild(item);
  })
}

function init(item) {

}

function addItem() {
  const value = input.value;
  if(value === "") {
    return;
  }
  const item = createItem(value);
  addDeleteListener(item);
  list.appendChild(item);
  return item;
}


plusBtn.addEventListener('click', () => {
  const item = addItem();
  item.scrollIntoView();
  input.value = "";
  input.focus();
})

input.addEventListener('keypress', e => {  
  if (e.key === "Enter") {
    const item = addItem();
    item.scrollIntoView();
    input.value = "";
  }
})

