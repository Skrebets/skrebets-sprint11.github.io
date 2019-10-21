/* Класс попапа формы, в которую вводятся название карточки и ссылка на картинку */

/* Можно лучше:
   Хорошо, что для попапов созданы классы, но есть дублирование кода отвечающего за открытие / закрытие попапа.
   Избавится от него можно выделяя базовый класс Popup и применив наследование расширить его функционал для 
   каждого конкретного попапа. 
   В этом нам помогут ключевые слова: 
      extends для наследования https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Classes/extends
      super для вызова методов базового класса https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/super
   
   Например:
    class Popup() { //базовый класс
      constructor(container) {
        this.container = container;
      }

      close() {
        this.container.classList.remove("popup_is-opened");
      }

      open(event) {
        this.container.classList.add("popup_is-opened");
      }
    }

    class PopUpPlace extends Popup { //класс расширяет функционал базового класса
      // construtor не нужен т.к. он полностью повторял то, что есть в базовом классе 

      open() {
        super.open(); // вызываем метод базового класса
        renderAddButton(nameCard, picLink);
      }

      close() {
        super.close(); // вызываем метод базового класса
        form.reset();
      }
    }

    class PopUpEdit  extends Popup{
      // construtor не нужен т.к. он полностью повторял то, что есть в базовом классе 

      open() {
        super.open();
        errorUser.textContent = '';
        errorJob.textContent = '';
        fillInput();
      }

      //close  - не нужен, т.к. полностью повторял бы базовый класс
    }
*/

import {formContainer, nameCard, picLink, renderAddButton} from '../index.js';

export class PopUpPlace {
    construtor(container) {
      this.container = container;
    }
  
    open() {
      formContainer.classList.add('popup_is-opened');
  
      renderAddButton(nameCard, picLink);
    }
  
    close() {
      formContainer.classList.remove('popup_is-opened');
  
      form.reset();
    }
}
  
export const formPlacesPop = new PopUpPlace(formContainer);
