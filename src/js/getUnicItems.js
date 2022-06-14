import getRandom from "./getRandom";
import pets from "./pets";

function getUnicItems(amount, prevItems = []) {
  const unicItems = [];

  for (let i = 0; i < amount; i++) {
    let item;

    const getUnic = () => {
      item = getRandom(0, pets.length - 1);

      if (unicItems.includes(item) || prevItems.includes(item)) {
        getUnic();
      }
    }
    getUnic();

    unicItems.push(item);
  }

  return unicItems;
}

export default getUnicItems;