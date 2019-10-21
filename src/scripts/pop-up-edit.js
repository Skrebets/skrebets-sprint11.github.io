/* Класс попапа формы «Редактировать профиль» */

import {profileEditContainer, errorUser, errorJob, fillInput} from '../index.js';

class PopUpEdit {
    constructor(container) {
      this.container = container;
    }
  
    open() {
      /* Можно лучше: нужно использовать this.container, а не profileEditContainer  */
      profileEditContainer.classList.add('popup_is-opened');
  
      errorUser.textContent = '';
  
      errorJob.textContent = '';
  
      fillInput();
    }
  
    close() {
      /* Можно лучше: нужно использовать this.container, а не profileEditContainer  */
      profileEditContainer.classList.remove('popup_is-opened');
    }
}
  
export const formEditPop = new PopUpEdit(profileEditContainer);

