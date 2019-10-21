/* Класс для хранения и отрисовки карточек */
import {Card} from './card.js';

export class CardList {
    constructor(container, array) {
      this.container = container;
      this.revealCards(array);
    }
  
    /* Можно лучше: назвать метод просто addCard, как предложено в задании к работе,
    неважно где этот метод вызывается */
    addCard(link, name) {
      const { cardElement } = new Card(link, name);
  
      /* Можно лучше: массив this.cards не нужен. Карточки в него помещаются, но никак не используются */
  
      this.container.appendChild(cardElement);
    }
  
    revealCards(arr) {
      for (let i = 0; i < arr.length; i++) {
        const { cardElement } = new Card(arr[i]['link'], arr[i]['name']);
  
        this.container.appendChild(cardElement);
      }
    }
}
 
  /**
   * Отличная работа!
   * 
   * Получение данных работает корректно - можно оставить только один вызов
   * нет смысла создавать класс списка если данных нет.
   */
  
