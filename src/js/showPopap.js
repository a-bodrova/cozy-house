import { showOverlay, hideOverlay } from "./showOverlay";
import { lockBody, unlockBody } from "./scrollBody";


const popap = document.querySelector('.popap');
const closeButton = popap.querySelector('.popap__close-button');
const overlay = document.querySelector('.overlay');

function activeButton(e) {
  if (e.target === overlay) {
    closeButton.classList.add('hover');
  }
};

function disactiveButton() {
  closeButton.classList.remove('hover');
};

export function closePopap() {
  popap.classList.remove('active');
  hideOverlay();
  unlockBody();
  overlay.removeEventListener('mouseover', activeButton);
  overlay.removeEventListener('mouseout', disactiveButton);
  overlay.removeEventListener('click', closePopap);
}

export function showPopap(petInfo) {
  showOverlay();

  closeButton.onclick = closePopap;
  const popapImage = popap.querySelector('.popap__image');
  popapImage.src = petInfo.img;
  popapImage.alt = petInfo.name;

  const title = popap.querySelector('.popap__title');
  title.textContent = petInfo.name;

  const subtitle = popap.querySelector('.popap__subtitle');
  subtitle.textContent = `${petInfo.type} - ${petInfo.breed}`;

  const description = popap.querySelector('.popap__description');
  description.textContent = petInfo.description;

  const ageField = popap.querySelector('.age__text');
  ageField.textContent = petInfo.age;

  const inoculationsField = popap.querySelector('.inoculations__text');
  inoculationsField.textContent = petInfo.inoculations.join(', ');

  const deseasesField = popap.querySelector('.deseases__text');
  deseasesField.textContent = petInfo.diseases.join(', ');

  const parasitesField = popap.querySelector('.parasites__text');
  parasitesField.textContent = petInfo.parasites.join(', ');

  const top = window.innerHeight > popap.offsetHeight + 60
    ? window.scrollY + ((window.innerHeight - popap.offsetHeight) / 2)
    : window.scrollY + 60;

  popap.style.top = `${top}px`;
  popap.classList.add('active');
  console.log(popap.offsetHeight);
  overlay.addEventListener('mouseover', activeButton);
  overlay.addEventListener('mouseout', disactiveButton);
  overlay.addEventListener('click', closePopap);
  
  lockBody();
};