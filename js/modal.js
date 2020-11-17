'use strict';

(function () {
  const formUpload = document.querySelector(`.img-upload__overlay`);
  const imgPreview = formUpload.querySelector(`.img-upload__preview`);
  const fileInput = document.querySelector(`#upload-file`);
  const buttonUploadCancel = document.querySelector(`#upload-cancel`);
  const imgUploadForm = document.querySelector(`.img-upload__form`);


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

  window.modal = {
    formUpload,
    imgPreview,
  };
})();
