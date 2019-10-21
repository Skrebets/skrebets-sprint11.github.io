/* Класс попапа формы «Редактировать профиль» */

import {fillInput} from '../index.js';

export const errorUser = document.querySelector('.error-user');
export const errorJob = document.querySelector('.error-job');
export const profileEditContainer = document.querySelector('.profile-edit');

export class PopUpEdit {
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


