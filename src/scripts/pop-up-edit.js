/* Класс попапа формы «Редактировать профиль» */
import {formEdit} from './validation.js';

export const errorUser = document.querySelector('.error-user');
export const errorJob = document.querySelector('.error-job');
export const profileEditContainer = document.querySelector('.profile-edit');
export const userName = document.querySelector('.user-info__name');
export const userJob = document.querySelector('.user-info__job');

export class PopUpEdit {
    constructor(container) {
      this.container = container;
    }

    fillInput() {
      formEdit.elements.user.value = userName.textContent;
      formEdit.elements.job.value = userJob.textContent;
    }
  
    open() {
      /* Можно лучше: нужно использовать this.container, а не profileEditContainer  */
      profileEditContainer.classList.add('popup_is-opened');
  
      errorUser.textContent = '';
  
      errorJob.textContent = '';
  
      const popUpEdit = new PopUpEdit(profileEditContainer);

      popUpEdit.fillInput();
    }
  
    close() {
      /* Можно лучше: нужно использовать this.container, а не profileEditContainer  */
      profileEditContainer.classList.remove('popup_is-opened');
    }
}
