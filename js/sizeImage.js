'use strict';

(function () {
  const STEP_SIZE = 25;
  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const scaleControlValue = window.modal.formUpload.querySelector(`.scale__control--value`);
  const scaleControlSmaller = window.modal.formUpload.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = window.modal.formUpload.querySelector(`.scale__control--bigger`);

  let scaleControlDefault = 100;
  scaleControlValue.value = scaleControlDefault + `%`;
  scaleControlSmaller.addEventListener(`click`, function () {
    if (scaleControlDefault > MIN_SCALE) {
      scaleControlValue.value = (scaleControlDefault - STEP_SIZE) + `%`;
      scaleControlDefault = scaleControlDefault - STEP_SIZE;
      window.modal.imgPreview.style.transform = `scale(0.${scaleControlDefault})`;
    } else {
      scaleControlValue.value = MIN_SCALE + `%`;
    }
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (scaleControlDefault < MAX_SCALE) {
      scaleControlValue.value = (scaleControlDefault + STEP_SIZE) + `%`;
      scaleControlDefault = scaleControlDefault + STEP_SIZE;
      if (scaleControlDefault === MAX_SCALE) {
        window.modal.imgPreview.style.transform = `scale(1)`;
      } else {
        window.modal.imgPreview.style.transform = `scale(0.${scaleControlDefault})`;
      }
    } else {
      scaleControlValue.value = MAX_SCALE + `%`;
    }
  });

  window.sizeImage = {
    scaleControlValue,
  };
})();
