'use strict';

const deleteAll = document.querySelector('.header__deleteAll');
const main = document.querySelector('.shopping-list__main');
const list = document.querySelector('.main__list');
const input = document.querySelector('#input-text');
const plusBtn = document.querySelector('.footer__plus');

const savedList = [];

let id = 0;

function createItem() {
  const item = document.createElement('li');
  item.setAttribute('class', 'main__item');
  item.setAttribute('data-id', id);
  item.innerHTML =`
    <label class="item__check" data-id="${id}">
      <input type="checkbox" class="checkbox">
      <span class="checkmark"></span>
      <span class="check__desc"></span>
    </label>
    <button class="item__delete" data-id="${id}">
      <i class="fas fa-minus-square"></i>
    </button>`;
  id++;
  return item;
}

function addItem() {
  const value = input.value;
  if(value === "") {
    return;
  }
  const item = createItem();
  list.appendChild(item);
  const desc = item.querySelector('.check__desc');
  desc.textContent = value;
  return item;
}

function updateListInLS() {
  const jsonList = JSON.stringify(savedList);
  localStorage.setItem('items', jsonList);
}

function saveList() {
  savedList.length = 0;
  const _list = list.childNodes;
  _list.forEach(child => savedList.push(child.outerHTML));
  updateListInLS();
}

function initId(item) {
  const pattern = /(?<=data-id=\")\d(?=\")/g;
  const _item = item.replace(pattern, id);
  id++;
  return _item;
}

function loadItems() {
  const jsonList = localStorage.getItem('items');
  const _list = JSON.parse(jsonList);
  _list.forEach(item => {
    const _item = initId(item);
    savedList.push(_item);
  });
  savedList.forEach(html => {
    const item = document.createElement('li');
    list.appendChild(item);
    item.outerHTML = html;
  });
}

function calcLengthOfLang(ptn, str) {
  const check = str.match(ptn);
  let length = 0;
  if(check) {
    check.forEach(str => {
      length += str.length;
    })
  }
  return length;
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

list.addEventListener('click', e => {
  const target = e.target;
  const _id = target.dataset.id || target.parentNode.dataset.id;
  if (!_id) {
    return;
  }
  const item = list.querySelector(`.main__item[data-id="${_id}"]`);
  if (target.className === 'item__delete' || target.parentNode.className === 'item__delete') {
    item.remove();
  } else if (target.className === 'item__delete' || target.parentNode.className === 'item__check') {
    const checkbox = item.querySelector('.checkbox');
    if (checkbox.checked) {
      checkbox.setAttribute('checked', 'checked');
    } else {
      checkbox.removeAttribute('checked');
    }
  }
  saveList();
})

input.addEventListener('keyup', e => {
  if (e.key.length > 1) {
    return;
  }
  const value = input.value;
  const ptnKor = /[ㄱ-힣]+/g;
  const korLength = calcLengthOfLang(ptnKor, value);
  if(korLength > 0) {
    input.maxLength = Math.floor(44 - korLength * 1.5);
  } else {
    input.maxLength = 38;
  }
})