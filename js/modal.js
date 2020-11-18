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
  const successButton = successTemplate.querySelector(`.success__button`);
  const errorButton = errorTemplate.querySelector(`.error__button`);


  fileInput.addEventListener(`change`, function () {
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.sizeImage.scaleControlValue.value = `100%`;

    const closeFileInput = function () {
      formUpload.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      fileInput.value = ``;
      imgUploadForm.reset();
    };

    buttonUploadCancel.addEventListener(`click`, function () {
      closeFileInput();
    });

    imgUploadForm.addEventListener(`submit`, function (evt) {
      window.upload(new FormData(imgUploadForm), function () {
        closeFileInput();
      });
      evt.preventDefault();
    });
  });


  const closeModal = function () {
    window.modal.imgUploadForm.reset();
    window.modal.fileInput.value = ``;
  };

  window.successHandler = function () {
    const fragment = document.createDocumentFragment();
    const successElement = successTemplate.cloneNode(true);
    fragment.appendChild(successElement);
    document.querySelector(`main`).appendChild(fragment);
    successButton.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      successTemplate.remove();
      closeModal();
    });
  };

  window.errorHandler = function () {
    const fragment = document.createDocumentFragment();
    const errorElement = errorTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    document.querySelector(`main`).appendChild(fragment);
    errorButton.addEventListener(`click`, function () {
      errorTemplate.classList.add(`hidden`);
      closeModal();
    });
  };
  window.modal = {
    formUpload,
    imgPreview,
    fileInput
  };
})();
