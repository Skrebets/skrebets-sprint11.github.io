const form = document.forms.new;
const picLink = form.elements.link.value;
const nameCard = form.elements.name.value;

const plasesCardList = document.querySelector('.places-list');


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

const api = new Api({
  url: 'http://95.216.175.5/cohort3',
  headers: {
    authorization: '06ffa0b4-82eb-410e-8ee4-49b7701546c0',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards().then((result) => new CardList(plasesCardList, result));

api.getUserInfo().then((result) => {
  console.log(result);

  userName.textContent = result.name;

  userJob.textContent = result.about;

  userPhoto.style.backgroundImage = `url(${result.avatar})`;
  /**
   * Можно улучшить
   * 
   * Для избежания ошибок при отсутствии данных лучше проверять результат запроса
   * на наличие всех ключей и значений
   * 
   * в случае с объектом if (res.name && res.about)
   * с массивом if (result && result.length > 0)
   */
})


/* Класс, создающий карточку */


class Card {
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


/* Класс для хранения и отрисовки карточек */


class CardList {
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

      plasesCardList.appendChild(cardElement);
    }
  }
}

const cardlist = new CardList(plasesCardList, []);

/**
 * Отличная работа!
 * 
 * Получение данных работает корректно - можно оставить только один вызов
 * нет смысла создавать класс списка если данных нет.
 */

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const linkValue = event.currentTarget.elements.link.value;

  const nameValue = event.currentTarget.elements.name.value;

  cardlist.addCard(linkValue, nameValue);

  form.reset();

  const formPlacesPop = new PopUpPlace(formContainer);

  formPlacesPop.close();
});


/* Класс попапа формы, в которую вводятся название карточки и ссылка на картинку */


const formContainer = document.querySelector('.popup');
const addButton = document.querySelector('.user-info__button');
const closeButton = document.querySelector('.popup__close');

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

class PopUpPlace {
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

const formPlacesPop = new PopUpPlace(formContainer);

addButton.addEventListener('click', formPlacesPop.open);

closeButton.addEventListener('click', formPlacesPop.close);


/* Класс попапа формы «Редактировать профиль» */


const editButton = document.querySelector('.user-info__edit-button');
const profileEditContainer = document.querySelector('.profile-edit');
const closeButtonEdit = document.querySelector('.close-profile-edit');

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

const formEditPop = new PopUpEdit(profileEditContainer);

editButton.addEventListener('click', formEditPop.open);

closeButtonEdit.addEventListener('click', formEditPop.close);


/* Редактирование имени и информации о себе */


const formEdit = document.forms.edit;

const profileName = formEdit.elements.user.value;

const profileAbout = formEdit.elements.job.value;

const userName = document.querySelector('.user-info__name');

const userJob = document.querySelector('.user-info__job');

const userPhoto = document.querySelector('.user-info__photo');

function fillInput () {
  formEdit.elements.user.value = userName.textContent;
  formEdit.elements.job.value = userJob.textContent; 
}

fillInput();

function editInfo(profileName, profileAbout) {
  userName.textContent = profileName;

  userJob.textContent = profileAbout;
}

formEdit.addEventListener('submit', function(event) {
  event.preventDefault();

  const formName = event.currentTarget.elements.user.value;

  const formJob = event.currentTarget.elements.job.value;

  editInfo(formName, formJob);

  api.postEditInfo(formName, formJob);

  formEdit.reset();

  const formEditPop = new PopUpEdit(profileEditContainer);

  formEditPop.close();
})


/* Класс для попапа с картинкой */


const root = document.querySelector('.root');

class PopUpPic {
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
plasesCardList.addEventListener('click', function(event) {
  if(event.target.classList.contains('place-card__image')) {
    const popUpPic = new PopUpPic();

    root.appendChild(popUpPic.popUpPicElement);
  };
});


/* Валидация всех форм */


const addCardButton = document.querySelector('.popup__button_add');

const saveChangesButton = document.querySelector('.popup__button_save');

function renderAddButton(nameCard, picLink) {
  if (picLink.length === 0 || nameCard.length === 0) {
    addCardButton.classList.add('popup__button_unactive');
    addCardButton.setAttribute('disabled', true);
  } else {
    addCardButton.classList.remove('popup__button_unactive');
    addCardButton.removeAttribute('disabled');
  }
}

form.addEventListener('input', function(event) {
  event.preventDefault();

  const formNameCard = event.currentTarget.elements.name.value;

  const formPicLink = event.currentTarget.elements.link.value;

  renderAddButton(formNameCard, formPicLink);
});

function renderSaveButton(profileName, profileAbout) {
  if (profileAbout.length === 0 || profileName.length === 0) {
    saveChangesButton.classList.add('popup__button_unactive');
    saveChangesButton.setAttribute('disabled', true);
  } else {
    saveChangesButton.classList.remove('popup__button_unactive');
    saveChangesButton.removeAttribute('disabled');
  }
}

formEdit.addEventListener('input', function(event) {
  event.preventDefault();

  const formProfileName = event.currentTarget.elements.user.value;

  const formProfileAbout = event.currentTarget.elements.job.value;

  renderSaveButton(formProfileName, formProfileAbout);
});


/* Валидация формы «Редактировать профиль» */


const errorUser = document.querySelector('.error-user');

const errorJob = document.querySelector('.error-job');

/*  Можно лучше:  функции formEditValidCheckName и formEditValidCheckAbout
    дублируют друг друга. Лучше оставить одну
*/

function formEditValidCheckName(profileName) {
  if (profileName.length === 0) {
    return 'Это обязательное поле';
  } else if (profileName.length < 2 || profileName.length > 30) {
    return 'Должно быть от 2 до 30 символов';
  }
  return '';
}

function formEditValidCheckAbout(profileAbout) {
  if (profileAbout.length === 0) {
    return 'Это обязательное поле';
  } else if (profileAbout.length < 2 || profileAbout.length > 30) {
    return 'Должно быть от 2 до 30 символов';
  }
  return '';
}

formEdit.addEventListener('input', (event) => {
  event.preventDefault();

  const profileNameError = formEditValidCheckName(event.currentTarget.elements.user.value);
  errorUser.textContent = profileNameError;

  const profileAboutError = formEditValidCheckAbout(event.currentTarget.elements.job.value);
  errorJob.textContent = profileAboutError;

  if (profileNameError === '' && profileAboutError === '') {
    saveChangesButton.classList.remove('popup__button_unactive');
    saveChangesButton.removeAttribute('disabled');
  } else {
    saveChangesButton.classList.add('popup__button_unactive');
    saveChangesButton.setAttribute('disabled', true);
  }
})

/*
Хорошая работа, классы организованы верно, есть только одно критическое замечание 
в классе Card, где используется глобальная переменная. Лучше при разработке стараться 
не использовать гловальные переменные. Если чтото нужно использовать в классе нужно передавать это через
параметры конструктора или параметры метода. Так код получается более гибким и легче может переиспользоваться.
Т.к. замечание всего одно и я показал как его исправить, то не стал уж отправлять на доработку

Где можно сделать лучше:
- привязать обработчики событий к контексту класса
- выделить базовы класс Popup и применить наследование
- обработчик на открытие попапа с картинкой вешать в классе Card


*/


