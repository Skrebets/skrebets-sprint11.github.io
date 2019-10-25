import "./pages/index.css";

import {Api} from './scripts/api.js';
import {CardList} from './scripts/card-list.js';
import {PopUpPic} from './scripts/pop-up-pic.js';
import {root} from './scripts/pop-up-pic.js';
import {PopUpPlace} from './scripts/pop-up-place.js';
import {form} from './scripts/validation.js';
import {picLink} from './scripts/validation.js';
import {nameCard} from './scripts/validation.js';
import {formContainer} from './scripts/pop-up-place.js';
import {PopUpEdit} from './scripts/pop-up-edit.js';
import {errorUser} from './scripts/pop-up-edit.js';
import {errorJob} from './scripts/pop-up-edit.js';
import {userName} from './scripts/pop-up-edit.js';
import {userJob} from './scripts/pop-up-edit.js';
import {profileEditContainer} from './scripts/pop-up-edit.js';
import {formEdit} from './scripts/validation.js';
import {profileName} from './scripts/validation.js';
import {profileAbout} from './scripts/validation.js';
import {renderAddButton} from './scripts/validation.js';
import {renderSaveButton} from './scripts/validation.js';
import {addCardButton} from './scripts/validation.js';
import {saveChangesButton} from './scripts/validation.js';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3'

const plasesCardList = document.querySelector('.places-list');

const addButton = document.querySelector('.user-info__button');
const closeButton = document.querySelector('.popup__close');

const editButton = document.querySelector('.user-info__edit-button');
const closeButtonEdit = document.querySelector('.close-profile-edit');

const userPhoto = document.querySelector('.user-info__photo');


/* Api */

const api = new Api({
  url: serverUrl,
  headers: {
    authorization: '06ffa0b4-82eb-410e-8ee4-49b7701546c0',
    'Content-Type': 'application/json'
  }
});

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


/* Для попапа с картинкой */


plasesCardList.addEventListener('click', function(event) {
  if(event.target.classList.contains('place-card__image')) {
    const popUpPic = new PopUpPic();

    root.appendChild(popUpPic.popUpPicElement);
  };
});


/* Для попапа карточки */


const formPlacesPop = new PopUpPlace(formContainer);

addButton.addEventListener('click', formPlacesPop.open);
  
closeButton.addEventListener('click', formPlacesPop.close);


/* Для попапа Редактировать профиль */


const formEditPop = new PopUpEdit(profileEditContainer);

editButton.addEventListener('click', formEditPop.open);
  
closeButtonEdit.addEventListener('click', formEditPop.close);


/* Для CardList */


const cardlist = new CardList(plasesCardList, []);


/* Слушатель для формы карточки */


form.addEventListener('submit', function(event) {
  event.preventDefault();

  const linkValue = event.currentTarget.elements.link.value;

  const nameValue = event.currentTarget.elements.name.value;

  cardlist.addCard(linkValue, nameValue);

  form.reset();

  const formPlacesPop = new PopUpPlace(formContainer);

  formPlacesPop.close();
});


/* Редактирование имени и информации о себе */


const popUpEdit = new PopUpEdit(profileEditContainer);

popUpEdit.fillInput();

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

  formEditPop.close();
})


/* Валидация всех форм */


form.addEventListener('input', function(event) {
  event.preventDefault();

  const formNameCard = event.currentTarget.elements.name.value;

  const formPicLink = event.currentTarget.elements.link.value;

  renderAddButton(formNameCard, formPicLink);
});

formEdit.addEventListener('input', function(event) {
  event.preventDefault();

  const formProfileName = event.currentTarget.elements.user.value;

  const formProfileAbout = event.currentTarget.elements.job.value;

  renderSaveButton(formProfileName, formProfileAbout);
});


/* Валидация формы «Редактировать профиль» */


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
