'use strict';

(function () {
  const effectsList = window.form.formUpload.querySelector(`.effects__list`);
  const slider = window.form.formUpload.querySelector(`.effect-level__pin`);
  const sliderValue = window.form.formUpload.querySelector(`.effect-level__value`);

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
        if (window.form.imgPreview.classList.contains(item)) {
          window.form.imgPreview.classList.remove(item);
        }
        window.form.imgPreview.classList.add(anotherClass);
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);

  const sliderValuePosition = 66;
  slider.style.left = sliderValuePosition + `%`;
  const sliderMouseUp = function () {
    if (!window.form.imgPreview.classList.contains(`effects__preview--none`)) {
      if (window.form.imgPreview.classList.contains(`effects__preview--chrome`)) {
        window.form.imgPreview.style.filter = `grayscale(${sliderValuePosition / 100})`;
      }
      if (window.form.imgPreview.classList.contains(`effects__preview--sepia`)) {
        window.form.imgPreview.style.filter = `sepia(${sliderValuePosition / 100})`;
      }
      if (window.form.imgPreview.classList.contains(`effects__preview--marvin`)) {
        window.form.imgPreview.style.filter = `invert(${sliderValuePosition})`;
      }
      if (window.form.imgPreview.classList.contains(`effects__preview--phobos`)) {
        window.form.imgPreview.style.filter = `blur(${1 + (0.02 * sliderValuePosition)}px)`;
      }
      if (window.form.imgPreview.classList.contains(`effects__preview--heat`)) {
        window.form.imgPreview.style.filter = `brightness(${1 + (0.02 * sliderValuePosition)})`;
      }
    } else {
      window.form.imgPreview.style.filter = `none`;
      sliderValue.classList.add(`hidden`);
    }
  };

  slider.addEventListener(`mouseup`, sliderMouseUp);

})();
