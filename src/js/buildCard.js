import buildElement from './buildElement';
import { showPopap } from './showPopap';

function buildCard(cardInfo) {
  const card = buildElement('div', 'card');
  
  const cardImage = buildElement('img', '', card);
  cardImage.width = '270';
  cardImage.height = '270';
  cardImage.alt = cardInfo.name;
  cardImage.src = cardInfo.img;

  const cardTitle = buildElement('h4', 'card__title', card, cardInfo.name);
  const cardButton = buildElement('button', 'button button_bordered', card, 'Learn more');

  card.onclick = () => {
    showPopap(cardInfo);
  }

  return card;
}

export default buildCard;