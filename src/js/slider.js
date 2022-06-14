import getUnicItems from "./getUnicItems";
import pets from "./pets";
import buildCard from "./buildCard";
import { amountCards, widthSliderContainer } from './constants';
import { getVersion } from "./getVersion";

const slider = () => {
  const outerWrapper = document.querySelector('.cards__outer-wrapper');
  const cardsContainer = document.querySelector('.cards__container');
  const prevButton = document.querySelector('.circle.circle_bordered.circle_left');
  const nextButton = document.querySelector('.circle.circle_bordered.circle_right');

  const version = getVersion();

  const needAmount = amountCards[version];

  let unicIndexes = getUnicItems(needAmount);

  function printCards(indexes, container) {
    const nextUnicIndexes = getUnicItems(needAmount, unicIndexes);
    container.innerHTML = '';

    indexes.forEach(index => {
      container.prepend(buildCard(pets[index]));
    })
    unicIndexes = [...nextUnicIndexes];
  }

  prevButton.onclick = () => {
    slidePrev(widthSliderContainer[version]);
  }

  nextButton.onclick = () => {
    slideNext(widthSliderContainer[version]);
  }

  function slidePrev(width) {
    const cardsContainer = document.querySelector('.cards__container');
    const prevContainer = cardsContainer.cloneNode(false);
    outerWrapper.prepend(prevContainer);
    prevContainer.style.left = `-${width}px`;
    prevContainer.classList.add('prev');
    printCards(unicIndexes, prevContainer);

    requestAnimationFrame(() => {
      prevContainer.style.left = `0px`;
      cardsContainer.style.left = `${width}px`;
    });
    
    cardsContainer.addEventListener('transitionend', () => cardsContainer.remove());
  }

  function slideNext(width) {
    const cardsContainer = document.querySelector('.cards__container');
    const nextContainer = cardsContainer.cloneNode(false);
    outerWrapper.append(nextContainer);
    nextContainer.style.left = `${width}px`;
    nextContainer.classList.add('prev');
    printCards(unicIndexes, nextContainer);

    requestAnimationFrame(() => {
      nextContainer.style.left = `0px`;
      cardsContainer.style.left = `-${width}px`;
    });

    cardsContainer.addEventListener('transitionend', () => cardsContainer.remove());
  }

  printCards(unicIndexes, cardsContainer);
}

export default slider;