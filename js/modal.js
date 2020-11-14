'use strict';

(function () {
  const formUpload = document.querySelector(`.img-upload__overlay`);
  const imgPreview = formUpload.querySelector(`.img-upload__preview`);
  const fileInput = document.querySelector(`#upload-file`);
  const buttonUploadCancel = document.querySelector(`#upload-cancel`);
  const textDescription = document.querySelector(`.text__description`);


  fileInput.addEventListener(`change`, function () {
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.sizeImage.scaleControlValue.value = `100%`;

    const closeFileInput = function () {
      formUpload.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);
      fileInput.value = ``;
    };

    buttonUploadCancel.addEventListener(`click`, function () {
      closeFileInput();
    });

    const onEscapeInInputClick = document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeFileInput();
      }
    });

    textDescription.addEventListener(`onblur`, onEscapeInInputClick);
  });


  window.modal = {
    formUpload,
    imgPreview,
  };
})();
