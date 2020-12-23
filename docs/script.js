const cardWrap = document.querySelector('.card-game');
const gameStartButton = document.querySelector('.main__btn');
const levels = document.querySelectorAll('.nav__level');
const section = document.querySelector('.main');
let currentLevel = document.querySelector('.level__active').firstElementChild.getAttribute('id');
let currentLevelStart = numberCards(currentLevel);

function chooseLevel(event) {
  levels.forEach((item) => item.classList.remove('level__active'));
  event.currentTarget.classList.add('level__active');
  currentLevel = document.querySelector('.level__active').firstElementChild.getAttribute('id');
};

levels.forEach((item) => item.addEventListener('click', chooseLevel));

function numberCards(currentLevel) {
  switch (currentLevel) {
    case 'simple':
      cardWrap.classList.add('three')
      return 3;
      break;
    case 'middle':
      cardWrap.classList.add('six')
      return 6;
      break;
    case 'hard':
      cardWrap.classList.add('ten')
      return 10;
      break;
  }
}

function createCard(currentLevelStart) {
  for (let i = 0; i < currentLevelStart; i++) {
    const card = document.createElement('div');
    card.classList.add('card', 'card_hover');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card__back');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card__front');

    cardWrap.append(card);
    card.append(cardBack);
    card.append(cardFront);
  };
};

function backSideOfCard(currentLevelStart) {
  let bug = Math.floor(Math.random() * currentLevelStart);
  const cardsBack = document.querySelectorAll('.card__back');

  for (let i = 0; i < currentLevelStart; i++) {
    if (i === bug) {
      cardsBack[i].classList.remove('card__back');
      cardsBack[i].classList.add('card__bug');
    }
  };
};

function deleteCards() {
  cardWrap.classList.remove('three', 'six', 'ten');
  while (cardWrap.firstChild) {
    cardWrap.removeChild(cardWrap.firstChild);
  };
};


function flipCard() {
  let inGame = true;
  const cards = document.querySelectorAll('.card');
  cards.forEach((item) => item.addEventListener('click', () => {
    if (inGame) {
      item.classList.add('flipped');
      item.classList.remove('card_hover');
      inGame = false;
      backSideOfCard(currentLevelStart);
    } else {
      section.classList.remove('none');
      cardWrap.classList.add('none');
      inGame = true;
      deleteCards();
    };
  }));
};

function startGame() {
  currentLevelStart = numberCards(currentLevel);
  section.classList.add('none');
  cardWrap.classList.remove('none');

  createCard(currentLevelStart);
  flipCard();
};


gameStartButton.addEventListener('click', startGame);