'use strict';

(function () {
  const MAX_NAME_LENGTH = 20;
  const HASH_PATTERN = /^#/;
  const LETTER_NUM_PATTERN = /^#[0-9a-z]+/i;
  const MAX_QANTITY_HASHTAGS = 5;
  const hashtagsInput = window.upload.formUpload.querySelector(`.text__hashtags`);

  hashtagsInput.addEventListener(`input`, function () {
    let hashtagsArray = hashtagsInput.value.trim().split(` `);
    if (hashtagsArray.length <= MAX_QANTITY_HASHTAGS) {
      hashtagsArray.forEach(function (item) {
        let valueLength = item.length;
        if (hashtagsArray.length > 1 && hashtagsArray.slice(0, -1).includes(item)) {
          hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды`);
        } else if (!HASH_PATTERN.test(item)) {
          hashtagsInput.setCustomValidity(`Хэш-тег должен начинаться с символа # (решётка)`);
        } else if (!LETTER_NUM_PATTERN.test(item)) {
          hashtagsInput.setCustomValidity(`Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;`);
        } else if (item === `#`) {
          hashtagsInput.setCustomValidity(`Хеш-тег не может состоять только из одной решётки`);
        } else if (valueLength > MAX_NAME_LENGTH) {
          hashtagsInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
        } else {
          hashtagsInput.setCustomValidity(``);
        }
      });
    } else {
      hashtagsInput.setCustomValidity(`Нельзя указывать больше пяти хэш-тегов`);
    }
    hashtagsInput.reportValidity();
  });
}());
