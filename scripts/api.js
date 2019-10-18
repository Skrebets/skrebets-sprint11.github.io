/* Класс api */

/**
 * Спринт 9:
 * 
 * Надо исправить:
 * В консоли отображается ошибка userPhoto is not defined
 * 
 * В реализации класса Api стоит использовать раздельную логику
 * В поля класса записывается не только токен, но и адрес.
 * 
 * Методы должны возвращать только результат fetch,
 * получая адрес из полей класса
 * 
 * getInitialCards() {
 *  return fetch(`${this.url}/cards`, { }) и явно указанный тип запроса
 *  GET POST PUT и другие по условиям задания
 * }
 * 
 */


class Api {
    constructor(options) {
      this.url = options['url'];
      this.headers = options['headers'];
      /**
       * Можно улучшить
       * 
       * Всегда удобнее и предпочтительнее использовать точечную нотацию
       * Для сокращения записи и получений переменных можно использовать разбор объекта
       * constructor({ url, headers }) { this.url = url }
       * https://developer.cdn.mozilla.net/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%D0%A0%D0%B0%D0%B7%D0%B1%D0%BE%D1%80_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2
       */
    }
  
    postEditInfo(name, about) {
      fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
        /**
         * Можно улучшить - при совпадении имен полей можно не дублировать значения
         * 
         * { name, about } будет работать аналогично
         */
      });
    }
    
  
    getInitialCards() {
      return fetch(`${this.url}/cards`, {
        method: 'GET',
        headers: this.headers
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          /**
           * Хорошо - результаты запроса и ошибки обрабатываются корректно
           */
  
          return Promise.reject(`Ошибка: ${res.status}`);
        })
  
            /**
             * Надо исправить
             * 
             * 
              * отрисовку следует выполнять вне класса Api
              * 
              * после
              * const api = new Api()
              * 
              * api.getCards().then(cards => new CardList(plasesCardList, cards))
             */
       
        .catch((err) => {
          console.log(err);
        });
    }
  
    getUserInfo() {
      return fetch(`${this.url}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
  
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        /**
         * Отлично - работа с отрисовкой отделена от запросов
         */
  
          /*
          userName.textContent = result.name;
  
          userJob.textContent = result.about;
  
          userPhoto.style.backgroundImage = `url(${result.avatar})`;
                /**
                 * Надо исправить
                 * 
                 * 
                 * отрисовку следует выполнять вне класса Api
                 */
  
        .catch((err) => {
          console.log(err);
        });
    }
}
  
export const api = new Api({
    url: 'http://95.216.175.5/cohort3',
    headers: {
      authorization: '06ffa0b4-82eb-410e-8ee4-49b7701546c0',
      'Content-Type': 'application/json'
    }
});