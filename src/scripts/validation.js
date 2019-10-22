export const form = document.forms.new;
export const picLink = form.elements.link.value;
export const nameCard = form.elements.name.value;
export const formEdit = document.forms.edit;
export const profileName = formEdit.elements.user.value;
export const profileAbout = formEdit.elements.job.value;
export const addCardButton = document.querySelector('.popup__button_add');
export const saveChangesButton = document.querySelector('.popup__button_save');

export function renderAddButton(nameCard, picLink) {
    if (picLink.length === 0 || nameCard.length === 0) {
      addCardButton.classList.add('popup__button_unactive');
      addCardButton.setAttribute('disabled', true);
    } else {
      addCardButton.classList.remove('popup__button_unactive');
      addCardButton.removeAttribute('disabled');
    }
}

export function renderSaveButton(profileName, profileAbout) {
    if (profileAbout.length === 0 || profileName.length === 0) {
      saveChangesButton.classList.add('popup__button_unactive');
      saveChangesButton.setAttribute('disabled', true);
    } else {
      saveChangesButton.classList.remove('popup__button_unactive');
      saveChangesButton.removeAttribute('disabled');
    }
}