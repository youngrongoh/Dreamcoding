'use strict'

// 아이템 생성 - document.createElement img태그 지정, setAttribute class 부여, setAttribute src 이미지 경로 지정 
const carrot = document.createElement('img');
const bug = document.createElement('img');
carrot.setAttribute('class', 'carrot');
carrot.setAttribute('src', './img/carrot.png');
bug.setAttribute('class', 'bug');
bug.setAttribute('src', './img/bug.png');

// 랜덤한 좌표값 계산 - Math.random() max-min 필드 범위 안에서

// 아이템 좌표 - position:relative top 0, left 0 기준 위치 설정, style.transform을 이용해 좌표 부여

// 필드에 아이템 배치 - appendChild

// play 버튼 누르면 랜덤배치, stop으로 변경

// refresh 누르면 랜덤 배치

