'use strict';

(function () {
  const effectsList = window.modal.formUpload.querySelector(`.effects__list`);
  const effectField = window.modal.formUpload.querySelector(`.img-upload__effect-level`);

  const effectsClasses = [
    `effects__preview--none`,
    `effects__preview--chrome`,
    `effects__preview--sepia`,
    `effects__preview--marvin`,
    `effects__preview--phobos`,
    `effects__preview--heat`
  ];

  effectField.classList.add(`hidden`);
  const onEffectsClick = function (evt) {
    const target = evt.target;
    let anotherClass;
    window.slider.sliderValuePosition = 100;
    window.slider.sliderLevel.style.width = 100 + `%`;
    window.slider.slider.style.left = window.slider.sliderValuePosition + `%`;
    if (evt.target.matches(`span`)) {
      let classes = target.classList;
      anotherClass = classes.item(classes.length - 1);
      effectsClasses.forEach(function (item) {
        if (window.modal.imgPreview.classList.contains(item)) {
          window.modal.imgPreview.classList.remove(item);
        }
        window.modal.imgPreview.classList.add(anotherClass);

        if (!window.modal.imgPreview.classList.contains(`effects__preview--none`)) {
          effectField.classList.remove(`hidden`);
          if (window.modal.imgPreview.classList.contains(`effects__preview--chrome`)) {
            window.modal.imgPreview.style.filter = `grayscale(1)`;
          }
          if (window.modal.imgPreview.classList.contains(`effects__preview--sepia`)) {
            window.modal.imgPreview.style.filter = `sepia(1)`;
          }
          if (window.modal.imgPreview.classList.contains(`effects__preview--marvin`)) {
            window.modal.imgPreview.style.filter = `invert(100%)`;
          }
          if (window.modal.imgPreview.classList.contains(`effects__preview--phobos`)) {
            window.modal.imgPreview.style.filter = `blur(3px)`;
          }
          if (window.modal.imgPreview.classList.contains(`effects__preview--heat`)) {
            window.modal.imgPreview.style.filter = `brightness(3)`;
          }
        } else {
          window.modal.imgPreview.style.filter = `none`;
          effectField.classList.add(`hidden`);
        }
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);
})();
