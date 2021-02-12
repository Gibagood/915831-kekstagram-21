'use strict';

(function () {
  const formUpload = document.querySelector(`.img-upload__overlay`);
  const imgPreview = formUpload.querySelector(`.img-upload__preview`);
  const fileInput = document.querySelector(`#upload-file`);
  const buttonUploadCancel = document.querySelector(`#upload-cancel`);
  const imgUploadForm = document.querySelector(`.img-upload__form`);
  const errorTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const successTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);


  fileInput.addEventListener(`change`, function () { // открытие модалки для загрузки картинки
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.sizeImage.scaleControlValue.value = `100%`;

    const closeFileInput = function () { // закрытие модалки загрузки картинки
      window.modal.imgPreview.style.filter = `none`;
      window.modal.imgPreview.style.transform = `scale(1)`;
      formUpload.classList.add(`hidden`);
      window.effects.effectField.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      fileInput.value = ``;
      imgUploadForm.reset();
      buttonUploadCancel.removeEventListener(`click`, closeButtonUploadCancel);
      document.removeEventListener(`keydown`, closeEscUploadCancel);
    };

    const closeButtonUploadCancel = function (evt) { // кнопка закрытия модалки загрузки картинки
      evt.preventDefault();
      closeFileInput();
    };
    buttonUploadCancel.addEventListener(`click`, closeButtonUploadCancel); // слушатель кнопки закрытия

    const closeEscUploadCancel = function (evt) { // esc для закрытия модалки загрузки картинки
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFileInput();
      }
    };
    document.addEventListener(`keydown`, closeEscUploadCancel); // слушатель esc


    const clickOnButton = function (evt) { // кнопка ок сообщение
      if (evt.target.matches(`.success__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickAround = function (evt) { // закрытие по нажатию всего кроме окна модалки
      if (!evt.target.matches(`.success__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickEsc = function (evt) { // esc окна моадлки с сообщением
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const successHandler = function () { // слушатели для модалки с сообщением
      document.addEventListener(`click`, clickOnButton);
      document.querySelector(`.success`).addEventListener(`click`, clickAround);
      document.addEventListener(`keydown`, clickEsc);
    };

    window.successModal = function () { // создание модалки сообщения из template
      const fragment = document.createDocumentFragment();
      const successElement = successTemplate.cloneNode(true);
      fragment.appendChild(successElement);
      document.querySelector(`main`).appendChild(fragment);
      const successMessage = document.querySelector(`.success`);
      successMessage.classList.remove(`hidden`);
      successHandler();
    };

    const clickOnAnotherLoad = function (evt) { // клик по кнопке error
      if (evt.target.matches(`.error__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickArroundError = function (evt) { // клик вокруг модалки сообщения error
      if (!evt.target.matches(`.error__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const errorHandler = function () { // слушатели сообщения error
      document.addEventListener(`click`, clickOnAnotherLoad);
      document.addEventListener(`keydown`, clickEsc);
      document.querySelector(`.error`).addEventListener(`click`, clickArroundError);
    };

    window.errorModal = function () { // создание модалки сообщения из template
      const fragment = document.createDocumentFragment();
      const errorElement = errorTemplate.cloneNode(true);
      fragment.appendChild(errorElement);
      document.querySelector(`main`).appendChild(fragment);
      const errorMessage = document.querySelector(`.error`);
      errorMessage.classList.remove(`hidden`);
      errorHandler();
    };

    const closeMessage = function () { // закрытие модалки с сообщением
      window.modal.imgPreview.style.filter = `none`;
      window.modal.imgPreview.style.transform = `scale(1)`;
      window.effects.effectField.classList.add(`hidden`);
      fileInput.value = ``;
      imgUploadForm.reset();
      const successMessage = document.querySelector(`.success`);
      successMessage.remove();
      /*  const errorMessage = document.querySelector(`.error`);
      errorMessage.classList.add(`hidden`); */
    };

    imgUploadForm.addEventListener(`submit`, function (evt) { // отправка формы
      let formData = new FormData(imgUploadForm);
      window.upload(formData, function () {
        closeFileInput();
      });
      evt.preventDefault();
      formData.delete(imgUploadForm);
    });
  });
  window.modal = {
    formUpload,
    imgPreview,
    fileInput
  };
})();
