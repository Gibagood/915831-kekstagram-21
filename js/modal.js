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


  fileInput.addEventListener(`change`, function () {
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.sizeImage.scaleControlValue.value = `100%`;

    const closeFileInput = function () {
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

    const closeButtonUploadCancel = function (evt) {
      evt.preventDefault();
      closeFileInput();
    };
    buttonUploadCancel.addEventListener(`click`, closeButtonUploadCancel);

    const closeEscUploadCancel = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFileInput();
      }
    };
    document.addEventListener(`keydown`, closeEscUploadCancel);

    const closeMessage = function () {
      window.modal.imgPreview.style.filter = `none`;
      window.modal.imgPreview.style.transform = `scale(1)`;
      window.effects.effectField.classList.add(`hidden`);
      fileInput.value = ``;
      imgUploadForm.reset();
      const successMessage = document.querySelector(`.success`);
      document.querySelector(`main`).removeChild(successMessage);
      /*  const errorMessage = document.querySelector(`.error`);
      errorMessage.classList.add(`hidden`); */
    };

    const clickOnButton = function (evt) {
      if (evt.target.matches(`.success__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickAround = function (evt) {
      if (!evt.target.matches(`.success__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickEsc = function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const successHandler = function () {
      document.addEventListener(`click`, clickOnButton);
      document.querySelector(`.success`).addEventListener(`click`, clickAround);
      document.addEventListener(`keydown`, clickEsc);
    };

    window.successModal = function () {
      const fragment = document.createDocumentFragment();
      const successElement = successTemplate.cloneNode(true);
      fragment.appendChild(successElement);
      document.querySelector(`main`).appendChild(fragment);
      const successMessage = document.querySelector(`.success`);
      successMessage.classList.remove(`hidden`);
      successHandler();
    };

    const clickOnAnotherLoad = function (evt) {
      if (evt.target.matches(`.error__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const clickArroundError = function (evt) {
      if (!evt.target.matches(`.error__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    };

    const errorHandler = function () {
      document.addEventListener(`click`, clickOnAnotherLoad);
      document.addEventListener(`keydown`, clickEsc);
      document.querySelector(`.error`).addEventListener(`click`, clickArroundError);
    };

    window.errorModal = function () {
      const fragment = document.createDocumentFragment();
      const errorElement = errorTemplate.cloneNode(true);
      fragment.appendChild(errorElement);
      document.querySelector(`main`).appendChild(fragment);
      const errorMessage = document.querySelector(`.error`);
      errorMessage.classList.remove(`hidden`);
      errorHandler();
    };

    imgUploadForm.addEventListener(`submit`, function (evt) {
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
