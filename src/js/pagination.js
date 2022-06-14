import pets from "./pets";
import { cardsPerPage, cardsPerPetsPage } from "./constants";
import buildCard from "./buildCard";
import { getVersion } from "./getVersion";
import getUnicItems from "./getUnicItems";

const width = getVersion(); // desktop | tablet | mobile
const amountCards = cardsPerPage[width]; // 8 | 6 | 3

export function getPagination() {
  const prevButton = document.querySelector('.single-corner_left.circle.circle_bordered');
  const nextButton = document.querySelector('.single-corner_right.circle.circle_bordered');
  const firstPageButton = document.querySelector('.double-corner_left.circle.circle_bordered');
  const lastPageButton = document.querySelector('.double-corner_right.circle.circle_bordered');
  const pageNumberButton = document.querySelector('.digit.circle.circle_colored');
  let pageNumber = 1;
  pageNumberButton.textContent = pageNumber;

  const cache = [];

  for (let i = 0; i < (cardsPerPetsPage / amountCards); i++) {
    cache.push(getChunk(width));
  }

  printCardsPerPage(amountCards, cache[pageNumber - 1]);

  toggleAccessButtons(pageNumber, cache.length);

  function toggleAccessButtons(pageNumb, amountPages) {
    if (pageNumb > 1) {
      enableButton(prevButton);
      enableButton(firstPageButton);
    };
    if (pageNumb < amountPages) {
      enableButton(nextButton);
      enableButton(lastPageButton);
    };
    if (pageNumb === 1) {
      disableButton(prevButton);
      disableButton(firstPageButton);
    };
    if (pageNumb === amountPages) {
      disableButton(nextButton);
      disableButton(lastPageButton);
    };
  }

  function getNextPage(pageNum, cach) {
    if (pageNum <= cach.length) {
      printCardsPerPage(amountCards, cach[pageNumber - 1]);
    }
    toggleAccessButtons(pageNum, cach.length);
  }
  
  function getPrevPage(pageNum, cach) {
    if (pageNum > 0) {
      printCardsPerPage(amountCards, cach[pageNumber - 1]);
    }
    toggleAccessButtons(pageNum, cach.length);
  }

  nextButton.onclick = () => {
    if (pageNumber < cache.length) {
      pageNumber += 1;
    }
    getNextPage(pageNumber, cache);
    pageNumberButton.textContent = pageNumber;
  }

  prevButton.onclick = () => {
    if (pageNumber > 1) {
      pageNumber -= 1;
    }
    getPrevPage(pageNumber, cache);
    pageNumberButton.textContent = pageNumber;
  }

  firstPageButton.onclick = () => {
    pageNumber = 1;

    getPrevPage(pageNumber, cache);
    pageNumberButton.textContent = pageNumber;
  }

  lastPageButton.onclick = () => {
    pageNumber = cache.length;

    getNextPage(pageNumber, cache);
    pageNumberButton.textContent = pageNumber;
  }
}

export function disableButton(button) {
  button.setAttribute('disabled', 'true');
}

export function enableButton(button) {
  button.removeAttribute('disabled');
}

export function getChunk(width) {
  return getUnicItems(cardsPerPage[width]); // get set of random numbers
};

export function printCardsPerPage(chunk, indexes) {
  const container = document.querySelector('.cards__container');
  container.innerHTML = '';
  container.classList.add('active');

  
  for (let i = 0; i < chunk; i++) {
    const petIndex = indexes[i];
    container.append(buildCard(pets[petIndex]));
  }
  container.addEventListener('animationend', () => {
    container.classList.remove('active');
  }, { once: true });
};