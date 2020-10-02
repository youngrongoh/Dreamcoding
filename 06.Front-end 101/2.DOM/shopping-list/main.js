'use strict';

const deleteAll = document.querySelector('.header__deleteAll');
const main = document.querySelector('.todo-list__main');
const list = document.querySelector('.main__list');
const input = document.querySelector('#input-text');
const plusBtn = document.querySelector('.footer__plus');

const savedList = [];

function createItem(value) {
  const item = document.createElement('li');
  item.setAttribute('class', 'main__item');
  item.innerHTML =
  `<label class="item__check">
  <input type="checkbox" class="checkbox">
  <span class="checkmark"></span>
  <span class="check__desc">${value}</span>
  </label>
  <button class="item__delete">
  <i class="fas fa-minus-square"></i>
  </button>`;
  return item;
}

function addCheckListener(item) {
  const check = item.querySelector('.item__check');
  check.addEventListener('click', e => {
    const checkbox = check.querySelector('.checkbox');
    if (checkbox.checked) {
      checkbox.setAttribute('checked', 'checked');
    } else {
      checkbox.removeAttribute('checked');
    }
    saveList();
  });
}

function addDeleteListener(item) {
  const deleteBtn = item.querySelector('.item__delete');
  deleteBtn.addEventListener('click', () => {
    list.removeChild(item);
    saveList();
  })
}

function addItem() {
  const value = input.value;
  if(value === "") {
    return;
  }
  const item = createItem(value);
  addCheckListener(item);
  addDeleteListener(item);
  list.appendChild(item);
  return item;
}

function updateListInLS() {
  const jsonList = JSON.stringify(savedList);
  localStorage.setItem('items', jsonList);
}

function saveList() {
  savedList.length = 0;
    const _list = list.childNodes;
      _list.forEach(child => savedList.push(child.innerHTML));
      updateListInLS();
}

function loadItems() {
  const jsonList = localStorage.getItem('items');
  const _list = JSON.parse(jsonList)
  _list.forEach(item => savedList.push(item));
  savedList.forEach(inner => {
    const item = document.createElement('li');
    item.setAttribute('class', 'main__item');
    item.innerHTML = inner;
    addDeleteListener(item);
    addCheckListener(item);
    list.appendChild(item);
  });
}

window.addEventListener('load', () => {
  loadItems();
})

plusBtn.addEventListener('click', () => {
  const item = addItem();
  item.scrollIntoView();
  input.value = "";
  input.focus();
  saveList();
})

input.addEventListener('keypress', e => {  
  if (e.key === "Enter" && input.value !== "") {
    const item = addItem();
    item.scrollIntoView();
    input.value = "";
    saveList();
  }
})

deleteAll.addEventListener('click', () => {
  list.innerHTML = "";
  saveList();
})