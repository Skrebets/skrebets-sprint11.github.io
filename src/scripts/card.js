/* Класс, создающий карточку */

export class Card {
    constructor(link, name) {
      this.cardElement = this.createCard(link, name);
      /*
          Можно лучше: лучше привязать контекст обработчиков событий к контексту класса.
          Для этого можно воспользоваться методом bind 
          https://learn.javascript.ru/bind#reshenie-2-privyazat-kontekst-s-pomoschyu-bind
          https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
          Т.е. в конструкторе до настройки обработчиков событий:
          this.like = this.like.bind(this);
          this.remove = this.remove.bind(this);
          После привязки контекста внутри обработчиков событий this
          будет ссылаться на экземпляр класса Card и можно обращаться к его свойствами
  
          Как это можно применить показал в методе remove 
      */
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
  
      this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    }
  
    createCard(picLink, nameCard) {
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('place-card');
  
      const cardPic = document.createElement('div');
      cardPic.classList.add('place-card__image');
      cardPic.style.backgroundImage = `url(${picLink})`;
  
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('place-card__delete-icon');
  
      const cardDescription = document.createElement('div');
      cardDescription.classList.add('place-card__description');
  
      const cardName = document.createElement('h3');
      cardName.classList.add('place-card__name');
      cardName.textContent = nameCard;
  
      const likeButton = document.createElement('button');
      likeButton.classList.add('place-card__like-icon');
  
      cardPic.appendChild(deleteButton);
            
      cardDescription.appendChild(cardName);
      cardDescription.appendChild(likeButton);
  
      cardContainer.appendChild(cardPic);
      cardContainer.appendChild(cardDescription);
      
      return cardContainer;
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  
    remove(event) {
      /*
        Можно лучше: если привязать контекст обработчиков событий, то удалять можно так:
        this.cardElement.parentNode.removeChild(this.cardElement);
      */
  
      /* Надо исправить: нельзя завязывать класс на глобальную переменную plasesCardList,
        в будущем карточки могут добавлять в разные контейнеры
        
        Удалять нужно через parentNode:
        const card = event.target.parentElement.parentElement;
        card.parentNode.removeChild(card);
      */
      const card = event.target.parentElement.parentElement;
      card.parentNode.removeChild(card);
    }
}

  