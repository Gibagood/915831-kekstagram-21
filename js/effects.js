'use strict';

(function () {
  const effectsList = window.upload.formUpload.querySelector(`.effects__list`);
  const slider = window.upload.formUpload.querySelector(`.effect-level__pin`);
  const sliderValue = window.upload.formUpload.querySelector(`.effect-level__value`);

  const effectsClasses = [
    `effects__preview--none`,
    `effects__preview--chrome`,
    `effects__preview--sepia`,
    `effects__preview--marvin`,
    `effects__preview--phobos`,
    `effects__preview--heat`
  ];

  const onEffectsClick = function (evt) {
    const target = evt.target;
    let anotherClass;
    if (evt.target.matches(`span`)) {
      let classes = target.classList;
      anotherClass = classes.item(classes.length - 1);
      effectsClasses.forEach(function (item) {
        if (window.upload.imgPreview.classList.contains(item)) {
          window.upload.imgPreview.classList.remove(item);
        }
        window.upload.imgPreview.classList.add(anotherClass);
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);

  const sliderValuePosition = 66;
  slider.style.left = sliderValuePosition + `%`;
  const sliderMouseUp = function () {
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
  };

  let startCoords;
  const sliderMouseDown = function (evt) {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    slider.style.top = (slider.offsetTop - shift.y) + `px`;
    slider.style.left = (slider.offsetLeft - shift.x) + `px`;
  };

  slider.addEventListener(`mousedown`, sliderMouseDown);
  document.addEventListener(`mousemove`, onMouseMove);
  slider.addEventListener(`mouseup`, sliderMouseUp);

})();
