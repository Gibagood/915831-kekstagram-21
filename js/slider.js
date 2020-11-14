'use strict';

(function () {
  const MAX_SLIDER_POSITION = 445;
  const SLIDER_WIDTH = 10;
  const sliderLine = window.modal.formUpload.querySelector(`.effect-level__line`);
  const slider = sliderLine.querySelector(`.effect-level__pin`);
  const sliderLevel = sliderLine.querySelector(`.effect-level__depth`);
  const sliderValue = window.modal.formUpload.querySelector(`.effect-level__value`);
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

      if (xPosition >= 0 && xPosition <= MAX_SLIDER_POSITION) {
        slider.style.left = (slider.offsetLeft - shift.x) + `px`;
        sliderValuePosition = slider.offsetLeft - shift.x;
        sliderLevel.style.width = (slider.offsetLeft - shift.x) + `px`;
      } else if (xPosition < 0) {
        slider.style.left = SLIDER_WIDTH + `px`;
        sliderLevel.style.width = SLIDER_WIDTH + `px`;
        document.removeEventListener(`mousemove`, sliderMouseMove);
      } else if (xPosition > MAX_SLIDER_POSITION) {
        slider.style.left = MAX_SLIDER_POSITION + SLIDER_WIDTH + `px`;
        sliderLevel.style.width = MAX_SLIDER_POSITION + SLIDER_WIDTH + `px`;
        document.removeEventListener(`mousemove`, sliderMouseMove);
      }
    };

    const sliderMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.modal.imgPreview.classList.contains(`effects__preview--none`)) {
        if (window.modal.imgPreview.classList.contains(`effects__preview--chrome`)) {
          window.modal.imgPreview.style.filter = `grayscale(${sliderValuePosition / MAX_SLIDER_POSITION})`;
        }
        if (window.modal.imgPreview.classList.contains(`effects__preview--sepia`)) {
          window.modal.imgPreview.style.filter = `sepia(${sliderValuePosition / MAX_SLIDER_POSITION})`;
        }
        if (window.modal.imgPreview.classList.contains(`effects__preview--marvin`)) {
          window.modal.imgPreview.style.filter = `invert(${(sliderValuePosition * 100) / MAX_SLIDER_POSITION}%)`;
        }
        if (window.modal.imgPreview.classList.contains(`effects__preview--phobos`)) {
          window.modal.imgPreview.style.filter = `blur(${1 + (0.004 * sliderValuePosition)}px)`;
        }
        if (window.modal.imgPreview.classList.contains(`effects__preview--heat`)) {
          window.modal.imgPreview.style.filter = `brightness(${1 + (0.004 * sliderValuePosition)})`;
        }
      } else {
        window.modal.imgPreview.style.filter = `none`;
        sliderValue.classList.add(`hidden`);
      }
      document.removeEventListener(`mousemove`, sliderMouseMove);
      document.removeEventListener(`mouseup`, sliderMouseUp);
    };

    document.addEventListener(`mousemove`, sliderMouseMove);
    document.addEventListener(`mouseup`, sliderMouseUp);

  });

  window.slider = {
    sliderValuePosition,
    sliderLevel,
    slider,
  };
})();
