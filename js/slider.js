'use strict';

(function () {
  const sliderLine = window.upload.formUpload.querySelector(`.effect-level__line`);
  const slider = sliderLine.querySelector(`.effect-level__pin`);
  const sliderLevel = sliderLine.querySelector(`.effect-level__depth`);
  const sliderValue = window.upload.formUpload.querySelector(`.effect-level__value`);
  let sliderValuePosition = 100;
  sliderLevel.style.width = 100 + `%`;

  slider.style.left = sliderValuePosition + `%`;

  slider.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX
    };

    const sliderMouseMove = function (moveEvt) {
      let xPosition = (slider.getBoundingClientRect().left - sliderLine.getBoundingClientRect().left);

      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (xPosition >= 0 && xPosition <= 445) {
        slider.style.left = (slider.offsetLeft - shift.x) + `px`;
        sliderValuePosition = slider.offsetLeft - shift.x;
        sliderLevel.style.width = (slider.offsetLeft - shift.x) + `px`;
      } else if (xPosition < 0) {
        slider.style.left = 10 + `px`;
      } else if (xPosition > 445) {
        slider.style.left = 435 + `px`;
      }
    };

    const sliderMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.upload.imgPreview.classList.contains(`effects__preview--none`)) {
        if (window.upload.imgPreview.classList.contains(`effects__preview--chrome`)) {
          window.upload.imgPreview.style.filter = `grayscale(${sliderValuePosition / 100})`;
        }
        if (window.upload.imgPreview.classList.contains(`effects__preview--sepia`)) {
          window.upload.imgPreview.style.filter = `sepia(${sliderValuePosition / 100})`;
        }
        if (window.upload.imgPreview.classList.contains(`effects__preview--marvin`)) {
          window.upload.imgPreview.style.filter = `invert(${sliderValuePosition})`;
        }
        if (window.upload.imgPreview.classList.contains(`effects__preview--phobos`)) {
          window.upload.imgPreview.style.filter = `blur(${1 + (0.02 * sliderValuePosition)}px)`;
        }
        if (window.upload.imgPreview.classList.contains(`effects__preview--heat`)) {
          window.upload.imgPreview.style.filter = `brightness(${1 + (0.02 * sliderValuePosition)})`;
        }
      } else {
        window.upload.imgPreview.style.filter = `none`;
        sliderValue.classList.add(`hidden`);
      }
      document.removeEventListener(`mousemove`, sliderMouseMove);
      document.removeEventListener(`mouseup`, sliderMouseUp);
    };

    document.addEventListener(`mousemove`, sliderMouseMove);
    document.addEventListener(`mouseup`, sliderMouseUp);

  });
})();
