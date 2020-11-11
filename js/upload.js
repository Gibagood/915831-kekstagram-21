'use strict';

(function () {
  const STEP_SIZE = 25;
  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const formUpload = document.querySelector(`.img-upload__overlay`);
  const imgPreview = formUpload.querySelector(`.img-upload__preview`);
  const scaleControlSmaller = formUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = formUpload.querySelector(`.scale__control--bigger`);
  const scaleControlValue = formUpload.querySelector(`.scale__control--value`);
  const fileInput = document.querySelector(`#upload-file`);
  const buttonUploadCancel = document.querySelector(`#upload-cancel`);
  const textDescription = document.querySelector(`.text__description`);


  fileInput.addEventListener(`change`, function () {
    formUpload.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    scaleControlValue.value = `100%`;

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


  let scaleControlDefault = 100;
  scaleControlValue.value = scaleControlDefault + `%`;
  scaleControlSmaller.addEventListener(`click`, function () {
    if (scaleControlDefault > MIN_SCALE) {
      scaleControlValue.value = (scaleControlDefault - STEP_SIZE) + `%`;
      scaleControlDefault = scaleControlDefault - STEP_SIZE;
      imgPreview.style.transform = `scale(0.${scaleControlDefault})`;
    } else {
      scaleControlValue.value = MIN_SCALE + `%`;
    }
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (scaleControlDefault < MAX_SCALE) {
      scaleControlValue.value = (scaleControlDefault + STEP_SIZE) + `%`;
      scaleControlDefault = scaleControlDefault + STEP_SIZE;
      if (scaleControlDefault === MAX_SCALE) {
        imgPreview.style.transform = `scale(1)`;
      } else {
        imgPreview.style.transform = `scale(0.${scaleControlDefault})`;
      }
    } else {
      scaleControlValue.value = MAX_SCALE + `%`;
    }
  });

  window.upload = {
    formUpload,
    scaleControlValue,
    imgPreview,
  };
})();
