/* Класс для попапа с картинкой */

export const root = document.querySelector('.root');

export class PopUpPic {
    constructor() {
      this.popUpPicElement = this.createPopUp();
      this.popUpPicElement.querySelector('.popup__close_pic').addEventListener('click', this.close);
    }
  
    createPopUp() {
      const popUpContainer = document.createElement('div');
      popUpContainer.classList.add('pic-popup');
      popUpContainer.style = event.target.getAttribute('style');
  
      const popUpClose = document.createElement('img');
      popUpClose.classList.add('popup__close');
      popUpClose.classList.add('popup__close_pic');
      popUpClose.setAttribute('alt', ' ');
      popUpClose.setAttribute('src', './images/close.svg');
  
      popUpContainer.appendChild(popUpClose);
  
      return popUpContainer;
    }
  
    close(event) {
      root.removeChild(event.target.parentElement);
    }
}
  
  /*
    Можно лучше: т.к. теперь создан класс Card, можно отказаться от делегирования и вешать
    обработчик в классе Card при создании карточки, там же где вешаются обработчики
    на удаление и лайк. Так весь функционал карточки будет описан в одном месте, а не разбросан по программе
  */
