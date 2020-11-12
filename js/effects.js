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
      });
    }
  };

  effectsList.addEventListener(`click`, onEffectsClick);
})();
