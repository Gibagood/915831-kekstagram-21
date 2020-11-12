'use strict';

(function () {
  const effectsList = window.upload.formUpload.querySelector(`.effects__list`);

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

        if (!window.upload.imgPreview.classList.contains(`effects__preview--none`)) {
          if (window.upload.imgPreview.classList.contains(`effects__preview--chrome`)) {
            window.upload.imgPreview.style.filter = `grayscale(1)`;
          }
          if (window.upload.imgPreview.classList.contains(`effects__preview--sepia`)) {
            window.upload.imgPreview.style.filter = `sepia(1)`;
          }
          if (window.upload.imgPreview.classList.contains(`effects__preview--marvin`)) {
            window.upload.imgPreview.style.filter = `invert(100%)`;
          }
          if (window.upload.imgPreview.classList.contains(`effects__preview--phobos`)) {
            window.upload.imgPreview.style.filter = `blur(3px)`;
          }
          if (window.upload.imgPreview.classList.contains(`effects__preview--heat`)) {
            window.upload.imgPreview.style.filter = `brightness(3)`;
          }
        } else {
          window.upload.imgPreview.style.filter = `none`;
        }
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);
})();
