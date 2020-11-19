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
    };

    buttonUploadCancel.addEventListener(`click`, function () {
      closeFileInput();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFileInput();
      }
    });

    imgUploadForm.addEventListener(`submit`, function (evt) {
      window.upload(new FormData(imgUploadForm), function () {
        closeFileInput();
      });
      evt.preventDefault();
    });
  });

  const closeMessage = function () {
    window.modal.imgPreview.style.filter = `none`;
    window.modal.imgPreview.style.transform = `scale(1)`;
    window.effects.effectField.classList.add(`hidden`);
    fileInput.value = ``;
    imgUploadForm.reset();
    const main = document.querySelector(`main`);
    const successMesage = document.querySelector(`.success`);
    main.removeChild(successMesage);
  };

  window.successHandler = function () {
    const fragment = document.createDocumentFragment();
    const successElement = successTemplate.cloneNode(true);
    fragment.appendChild(successElement);
    document.querySelector(`main`).appendChild(fragment);
    document.addEventListener(`click`, function (evt) {
      if (evt.target.matches(`.success__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    });

    document.querySelector(`.success`).addEventListener(`click`, function (evt) {
      if (!evt.target.matches(`.success__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeMessage();
      }
    });
  };

  window.errorHandler = function () {
    const fragment = document.createDocumentFragment();
    const errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    document.querySelector(`main`).appendChild(fragment);
    document.addEventListener(`click`, function (evt) {
      if (evt.target.matches(`.error__button`)) {
        evt.preventDefault();
        closeMessage();
      }
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeMessage();
      }
    });
    document.querySelector(`.error`).addEventListener(`click`, function (evt) {
      if (!evt.target.matches(`.error__inner`)) {
        evt.preventDefault();
        closeMessage();
      }
    });
  };

  window.modal = {
    formUpload,
    imgPreview,
    fileInput
  };
})();
